use handler::CozyCoderServerHandler;
use rust_mcp_schema::{
    Implementation, InitializeResult, LATEST_PROTOCOL_VERSION, ServerCapabilities,
    ServerCapabilitiesTools,
};
use rust_mcp_sdk::{
    McpServer, StdioTransport, TransportError, TransportOptions, error::McpSdkError,
    mcp_server::server_runtime,
};

pub(crate) mod document;
pub(crate) mod handler;

#[derive(Debug, thiserror::Error)]
pub enum McpError {
    #[error("Server error: {0}")]
    ServerError(String),

    #[error("Document error: {0}")]
    DocumentError(#[from] document::DocumentError),
}

impl From<McpSdkError> for McpError {
    fn from(err: McpSdkError) -> Self {
        McpError::ServerError(format!("SDK error - {}", err))
    }
}

impl From<TransportError> for McpError {
    fn from(err: TransportError) -> Self {
        McpError::ServerError(format!("Transport error - {}", err))
    }
}

pub fn server_details() -> InitializeResult {
    InitializeResult {
        server_info: Implementation {
            name: "cozycoder".to_string(),
            version: env!("CARGO_PKG_VERSION").to_string(),
        },
        capabilities: ServerCapabilities {
            experimental: None,
            logging: None,
            prompts: None,
            resources: None,
            tools: Some(ServerCapabilitiesTools { list_changed: None }),
        },
        instructions: None,
        meta: None,
        protocol_version: LATEST_PROTOCOL_VERSION.to_string(),
    }
}

pub async fn run_mcp_server() -> Result<(), McpError> {
    // Initialize the document manager
    let doc_manager = document::DocumentRepo::new().await?;

    // Initialize the transport and server handler
    let transport = StdioTransport::new(TransportOptions::default())?;
    let handler = CozyCoderServerHandler::new(doc_manager);

    // Create and start the server
    let server = server_runtime::create_server(server_details(), transport, handler);
    server.start().await.map_err(McpError::from)
}
