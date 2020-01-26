defmodule E2EWeb.Router do
  use E2EWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", E2EWeb do
    pipe_through(:browser)

    get("/", PageController, :index)
  end

  scope "/api/", E2EWeb do
    pipe_through(:api)

    get("/users", UserController, :index)
    post("/users", UserController, :create)
    get("/users/:id", UserController, :show)
    put("/users/:id", UserController, :update)
    delete("/users/:id", UserController, :delete)

    get("/todos", TodoController, :index)
    post("/todos", TodoController, :create)
    get("/todos/:id", TodoController, :show)
    put("/todos/:id", TodoController, :update)
    delete("/todos/:id", TodoController, :delete)
  end
end
