defmodule E2EWeb.PageController do
  use E2EWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
