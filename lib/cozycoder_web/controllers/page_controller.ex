defmodule CozyCoderWeb.PageController do
  use CozyCoderWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
