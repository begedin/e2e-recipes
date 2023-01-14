import Config

config :e2e,
  namespace: E2E,
  ecto_repos: [E2E.Repo]

# Configures the endpoint
config :e2e, E2EWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "xJpwfY1gWDnVYc3qbR1wHe8ZKLcZR2Tx6z+TwsDHJHWeGqS+HPKp+DsADx3JuvhA",
  render_errors: [view: E2EWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: E2E.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
