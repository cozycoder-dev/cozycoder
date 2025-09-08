use rmcp::{
    ErrorData as McpError, RoleServer, ServerHandler, ServiceExt,
    handler::server::router::prompt::PromptRouter,
    model::{
        GetPromptRequestParam, GetPromptResult, Implementation, ListPromptsResult,
        PaginatedRequestParam, PromptMessage, PromptMessageContent, PromptMessageRole,
        ReadResourceRequestParam, ReadResourceResult, ResourceContents, ServerCapabilities,
        ServerInfo,
    },
    prompt, prompt_handler, prompt_router,
    serde_json::json,
    service::RequestContext,
    transport::stdio,
};

pub(crate) async fn run() {
    let server: Server = Default::default();
    let service = server
        .serve(stdio())
        .await
        .expect("Unable to serve MCP via stdio transport");
    service.waiting().await.expect("MCP server failed");
}

#[derive(Clone)]
struct Server {
    prompt_router: PromptRouter<Server>,
}

impl Default for Server {
    fn default() -> Self {
        Server {
            prompt_router: Self::prompt_router(),
        }
    }
}

#[prompt_router]
impl Server {
    #[prompt(name = "example_prompt")]
    async fn example_prompt(
        &self,
        _ctx: RequestContext<RoleServer>,
    ) -> Result<Vec<PromptMessage>, McpError> {
        let prompt = "This is an example prompt with your message here: 'Hello'";
        Ok(vec![PromptMessage {
            role: PromptMessageRole::User,
            content: PromptMessageContent::text(prompt),
        }])
    }
}

#[prompt_handler]
impl ServerHandler for Server {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            server_info: Implementation {
                name: "mcpkg".to_string(),
                version: "dev".to_string(),
            },
            capabilities: ServerCapabilities::builder()
                .enable_prompts()
                .enable_resources()
                .build(),
            ..Default::default()
        }
    }

    async fn read_resource(
        &self,
        ReadResourceRequestParam { uri }: ReadResourceRequestParam,
        _: RequestContext<RoleServer>,
    ) -> Result<ReadResourceResult, McpError> {
        match uri.as_str() {
            "instruction://insights" => {
                let memo = "Business Intelligence Memo\n\nAnalysis has revealed 5 key insights ...";
                Ok(ReadResourceResult {
                    contents: vec![ResourceContents::text(memo, uri)],
                })
            }
            _ => Err(McpError::resource_not_found(
                "resource_not_found",
                Some(json!({
                    "uri": uri
                })),
            )),
        }
    }
}
