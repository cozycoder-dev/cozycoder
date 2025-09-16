use rmcp::{
    ErrorData, RoleServer, ServerHandler, ServiceExt,
    model::{
        Extensions, GetPromptRequestParam, GetPromptResult, Implementation, ListPromptsResult,
        PaginatedRequestParam, Prompt, PromptListChangedNotification,
        PromptListChangedNotificationMethod, PromptMessage, PromptMessageRole, PromptsCapability,
        ServerCapabilities, ServerInfo, ServerNotification,
    },
    service::RequestContext,
    transport::stdio,
};

pub(crate) async fn run() {
    let server = Server {};
    let service = server
        .serve(stdio())
        .await
        .expect("Unable to serve MCP via stdio transport");
    service.waiting().await.expect("MCP server failed");
}

struct Server {}

impl ServerHandler for Server {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            server_info: Implementation {
                name: "mcpkg".to_string(),
                version: "dev".to_string(),
            },
            capabilities: ServerCapabilities::builder()
                .enable_prompts_with(PromptsCapability {
                    list_changed: Some(true),
                })
                .build(),
            ..Default::default()
        }
    }

    async fn list_prompts(
        &self,
        _request: Option<PaginatedRequestParam>,
        context: RequestContext<RoleServer>,
    ) -> Result<ListPromptsResult, ErrorData> {
        context
            .peer
            .send_notification(PromptListChangedNotification {
                method: PromptListChangedNotificationMethod,
                extensions: Extensions::new(),
            });
        let prompt = Prompt::new("hello", Some("Says hello world"), None);
        Ok(ListPromptsResult::with_all_items(vec![prompt]))
    }

    async fn get_prompt(
        &self,
        _request: GetPromptRequestParam,
        _context: RequestContext<RoleServer>,
    ) -> Result<GetPromptResult, ErrorData> {
        Ok(GetPromptResult {
            description: None,
            messages: vec![PromptMessage::new_text(
                PromptMessageRole::User,
                "Hello world",
            )],
        })
    }
}
