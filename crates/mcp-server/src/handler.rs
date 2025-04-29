use async_trait::async_trait;
use rust_mcp_schema::{
    CallToolRequest, CallToolResult, ListToolsRequest, ListToolsResult, RpcError,
    schema_utils::CallToolError,
};
use rust_mcp_sdk::{
    McpServer,
    macros::{JsonSchema, mcp_tool},
    mcp_server::ServerHandler,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::document::DocumentRepo;

// STEP 1: Define a rust_mcp_schema::Tool ( we need one with no parameters for this example)
#[mcp_tool(
    name = "say_hello_world",
    description = "Prints \"Hello World!\" message"
)]
#[derive(Debug, Deserialize, Serialize, JsonSchema)]
pub struct SayHelloTool {}

pub struct CozyCoderServerHandler {
    document_manager: Arc<Mutex<DocumentRepo>>,
}

impl CozyCoderServerHandler {
    pub fn new(document_manager: DocumentRepo) -> Self {
        Self {
            document_manager: Arc::new(Mutex::new(document_manager)),
        }
    }

    async fn save_document(&self) -> Result<(), CallToolError> {
        let doc_manager = self.document_manager.lock().await;
        doc_manager.save().await.map_err(|e| {
            CallToolError::new(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("Failed to save document: {}", e),
            ))
        })
    }
}

#[async_trait]
impl ServerHandler for CozyCoderServerHandler {
    // Handle ListToolsRequest, return list of available tools as ListToolsResult
    async fn handle_list_tools_request(
        &self,
        _request: ListToolsRequest,
        _runtime: &dyn McpServer,
    ) -> Result<ListToolsResult, RpcError> {
        Ok(ListToolsResult {
            tools: vec![SayHelloTool::tool()],
            meta: None,
            next_cursor: None,
        })
    }

    /// Handles requests to call a specific tool.
    async fn handle_call_tool_request(
        &self,
        request: CallToolRequest,
        _runtime: &dyn McpServer,
    ) -> Result<CallToolResult, CallToolError> {
        if request.tool_name() == SayHelloTool::tool_name() {
            // Example of using the document (in a real implementation, this would
            // make meaningful changes to the document based on the tool call)
            {
                let mut doc_manager = self.document_manager.lock().await;
                let _doc = doc_manager.get_document_mut();
                // Here you would make changes to the document based on the tool call
                // For example:
                // let _result = _doc.put_object(automerge::ROOT, "last_hello", chrono::Utc::now().to_string());
            }

            // Save the document after modification
            self.save_document().await?;

            Ok(CallToolResult::text_content(
                "Hello World!".to_string(),
                None,
            ))
        } else {
            Err(CallToolError::unknown_tool(request.tool_name().to_string()))
        }
    }
}
