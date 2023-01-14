defmodule E2E.MixProject do
  use Mix.Project

  def project do
    [
      app: :e2e,
      dialyzer: dialyzer(),
      version: "0.1.0",
      elixir: "~> 1.14",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps(),
      preferred_cli_env: [
        ci: :test,
        acceptance: :test,
        test: :test
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
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:cors_plug, "~> 3.0"},
      {:credo, "~> 1.6", only: [:dev, :test], runtime: false},
      {:dialyxir, "~> 1.2", only: [:dev], runtime: false},
      {:ecto_sql, "~> 3.9"},
      {:ex_machina, "~> 2.7", only: [:test, :e2e]},
      {:gettext, "~> 0.21.0"},
      {:jason, "~> 1.4"},
      {:phoenix_ecto, "~> 4.4"},
      {:phoenix_html, "~> 3.2"},
      {:phoenix_live_reload, "~> 1.4", only: [:dev]},
      {:phoenix_pubsub, "~> 2.1"},
      {:phoenix, "~> 1.6"},
      {:plug_cowboy, "~> 2.6"},
      {:postgrex, "~> 0.16"},
      {:wallaby, "~> 0.30", runtime: false, only: :test}
    ]
  end

  defp dialyzer do
    [
      plt_add_deps: :app_tree,
      plt_file: {:no_warn, "priv/plts/e2e.plt"}
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
      acceptance: [
        "frontend build",
        "ecto.create --quiet",
        "ecto.migrate",
        "cmd 'E2E=1 mix test --include acceptance'"
      ],
      ci: [
        "frontend build",
        "ecto.create --quiet",
        "ecto.migrate",
        "cmd 'E2E=1 HEADLESS=1 mix test --include acceptance'"
      ],
      frontend: [~s[cmd "cd assets; npm run $!"]]
    ]
  end
end
