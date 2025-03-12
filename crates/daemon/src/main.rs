use daemon::app;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    // Get the router from the app module
    let app = app::run();

    // Bind to localhost:3031
    let addr = SocketAddr::from(([127, 0, 0, 1], 3031));
    println!("Server listening on {}", addr);

    // Start the server
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
