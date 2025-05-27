defmodule CozyCoderWeb.MCPController do
  use CozyCoderWeb, :controller

  def sse(conn, _params) do
    session_id = Ecto.UUID.generate()

    conn
    |> put_resp_header("cache-control", "no-cache")
    |> put_resp_header("connection", "keep-alive")
    |> put_resp_header("content-type", "text/event-stream; charset=utf-8")
    |> send_chunked(200)
    |> send_endpoint(session_id)
  end

  def message(_conn, _params) do
  end

  defp send_endpoint(conn, session_id) do
    endpoint = "#{conn.scheme}://#{conn.host}:#{conn.port}/mcp/#{session_id}"

    case chunk(conn, "event: endpoint\ndata: #{endpoint}\n\n") do
      {:ok, conn} -> conn
      {:error, _reason} -> conn
    end
  end
end
