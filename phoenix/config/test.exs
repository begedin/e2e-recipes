use Mix.Config

# Configure your database
config :e2e, E2E.Repo,
  username: "postgres",
  password: "postgres",
  database: "e2e_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :e2e, E2EWeb.Endpoint,
  http: [port: 4002],
  server: true

config :e2e, sql_sandbox: true

# Print only warnings and errors during test
config :logger, level: :warn

config :wallaby,
  chromedriver: [
    headless: System.get_env("CI") === "true",
    capabilities: %{
      javascriptEnabled: true,
      chromeOptions: %{
        args: [
          "--no-sandbox",
          "window-size=1280,720",
          "--disable-gpu",
          "--headless",
          "--fullscreen",
          "--user-agent=Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
        ]
      }
    }
  ],
  otp_app: :e2e
