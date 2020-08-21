defmodule E2E.MixProject do
  use Mix.Project

  def project do
    [
      app: :e2e,
      version: "0.1.0",
      elixir: "~> 1.10.4",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps(),
      preferred_cli_env: [
        integration: :test,
        test: :test,
        "e2e.server": :e2e,
        "e2e.reset": :e2e
      ]
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {E2E.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(:e2e), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:cors_plug, "~> 2.0"},
      {:ecto_sql, "~> 3.4.3"},
      {:ex_machina, "~> 2.4", only: [:test, :e2e]},
      {:gettext, "~> 0.15.0"},
      {:jason, "~> 1.0"},
      {:phoenix_ecto, "~> 4.1.0"},
      {:phoenix_html, "~> 2.14.2"},
      {:phoenix_live_reload, "~> 1.2", only: [:dev, :e2e]},
      {:phoenix_pubsub, "~> 2.0.0"},
      {:phoenix, "~> 1.5.3"},
      {:plug_cowboy, "~> 2.3.0"},
      {:postgrex, "0.15.3"},
      {:wallaby, "~> 0.26.0", runtime: false, only: :test}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"],
      integration: ["ecto.create --quiet", "ecto.migrate", "test --include integration"],
      ci: ["ecto.create --quiet", "ecto.migrate", "cmd 'CI=true mix test --include integration'"],
      "e2e.server": ["phx.server"],
      "e2e.reset": ["ecto.reset"]
    ]
  end
end
