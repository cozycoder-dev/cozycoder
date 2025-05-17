use rmcp::{
    Error as McpError, ServerHandler, ServiceExt,
    model::{CallToolResult, Content, Implementation, ServerCapabilities, ServerInfo},
    tool,
    transport::stdio,
};

#[derive(Clone)]
struct Server {}

#[tool(tool_box)]
impl Server {
    #[tool(description = "Greet the cozy coder")]
    async fn greet(&self) -> Result<CallToolResult, McpError> {
        Ok(CallToolResult::success(vec![Content::text(
            "Hello Cozy Coder".to_string(),
        )]))
    }
}

#[tool(tool_box)]
impl ServerHandler for Server {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            server_info: Implementation {
                name: "Cozy Coder".to_string(),
                version: "0.1.0".to_string(),
            },
            instructions: Some("This server says hello world".to_string()),
            ..Default::default()
        }
    }
}

pub(crate) async fn run() {
    let _ = Server {}
        .serve(stdio())
        .await
        .expect("Server cannot be started")
        .waiting()
        .await;
}
