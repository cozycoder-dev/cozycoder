use automerge::{Automerge, AutomergeError};
use std::path::PathBuf;
use thiserror::Error;
use tokio::fs;

const DOC_FILE_NAME: &str = "state.automerge";

#[derive(Debug, Error)]
pub enum DocumentError {
    #[error("Failed to load document: {0}")]
    Load(#[from] AutomergeError),

    #[error("Failed to save document: {0}")]
    Save(String),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

pub struct DocumentRepo {
    document: Automerge,
    file_path: PathBuf,
}

impl DocumentRepo {
    pub async fn new() -> Result<Self, DocumentError> {
        // Get or create data directory
        let data_dir = get_data_dir()?;
        let file_path = data_dir.join(DOC_FILE_NAME);

        let document = if file_path.exists() {
            Self::load_document(&file_path).await?
        } else {
            // Create directories if they don't exist
            if !data_dir.exists() {
                fs::create_dir_all(&data_dir).await?;
            }

            // Initialize a new document
            Self::initialize_document().await?
        };

        Ok(Self {
            document,
            file_path,
        })
    }

    async fn load_document(file_path: &PathBuf) -> Result<Automerge, DocumentError> {
        let bytes = fs::read(file_path).await?;
        let doc = Automerge::load(&bytes)?;
        Ok(doc)
    }

    async fn initialize_document() -> Result<Automerge, DocumentError> {
        let doc = Automerge::new();
        Ok(doc)
    }

    pub async fn save(&self) -> Result<(), DocumentError> {
        let bytes = self.document.save();
        fs::write(&self.file_path, bytes)
            .await
            .map_err(|e| DocumentError::Save(e.to_string()))?;
        Ok(())
    }

    pub fn get_document_mut(&mut self) -> &mut Automerge {
        &mut self.document
    }
}

fn get_data_dir() -> Result<PathBuf, DocumentError> {
    let home = dirs::home_dir().ok_or_else(|| {
        DocumentError::Io(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "Could not determine home directory",
        ))
    })?;
    Ok(home.join(".cozycoder"))
}
