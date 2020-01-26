defmodule E2E.Factory do
  # with Ecto
  use ExMachina.Ecto, repo: E2E.Repo

  def user_factory do
    %E2E.Accounts.User{
      name: sequence(:name, &"user-#{&1}"),
      password: sequence(:password, &"password-#{&1}")
    }
  end
end