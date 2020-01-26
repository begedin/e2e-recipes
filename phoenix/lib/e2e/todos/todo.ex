defmodule E2E.Todos.Todo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "todos" do
    field(:title, :string)

    belongs_to(:user, E2E.Accounts.User)

    timestamps()
  end

  @doc false
  def changeset(todo, attrs) do
    todo
    |> cast(attrs, [:title])
    |> validate_required([:title])
  end
end
