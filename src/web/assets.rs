// AssetWatcher struct for debug builds
#[cfg(debug_assertions)]
pub struct AssetWatcher {
    process: tokio::process::Child,
    _stdout_task: tokio::task::JoinHandle<()>,
    _stderr_task: tokio::task::JoinHandle<()>,
}

#[cfg(debug_assertions)]
impl Drop for AssetWatcher {
    fn drop(&mut self) {
        // Try to kill the process when AssetWatcher is dropped
        let _ = self.process.start_kill();
    }
}

// Empty AssetWatcher for release builds
#[cfg(not(debug_assertions))]
pub struct AssetWatcher;

#[cfg(debug_assertions)]
pub fn watch_assets() -> Option<AssetWatcher> {
    use tokio::io::{AsyncBufReadExt, BufReader};
    use tokio::process::Command;

    let mut child = match Command::new("npm")
        .args(["run", "dev"])
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
    {
        Ok(child) => child,
        Err(e) => {
            eprintln!("Failed to start npm run dev: {}", e);
            return None;
        }
    };

    // Set up stdout reader
    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            eprintln!("Failed to capture npm stdout");
            return None;
        }
    };

    let stdout_reader = BufReader::new(stdout).lines();

    // Set up stderr reader
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            eprintln!("Failed to capture npm stderr");
            return None;
        }
    };

    let stderr_reader = BufReader::new(stderr).lines();

    // Process stdout
    let stdout_task = tokio::spawn(async move {
        let mut reader = stdout_reader;
        loop {
            match reader.next_line().await {
                Ok(Some(line)) => println!("[npm] {}", line),
                Ok(None) => break, // End of stream
                Err(e) => {
                    eprintln!("Error reading npm stdout: {}", e);
                    break;
                }
            }
        }
    });

    // Process stderr
    let stderr_task = tokio::spawn(async move {
        let mut reader = stderr_reader;
        loop {
            match reader.next_line().await {
                Ok(Some(line)) => eprintln!("[npm] {}", line),
                Ok(None) => break, // End of stream
                Err(e) => {
                    eprintln!("Error reading npm stderr: {}", e);
                    break;
                }
            }
        }
    });

    Some(AssetWatcher {
        process: child,
        _stdout_task: stdout_task,
        _stderr_task: stderr_task,
    })
}

#[cfg(not(debug_assertions))]
pub fn watch_assets() -> Option<AssetWatcher> {
    None
}
