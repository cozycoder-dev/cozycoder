defmodule CozyCoder.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CozyCoderWeb.Telemetry,
      CozyCoder.Repo,
      {Ecto.Migrator,
       repos: Application.fetch_env!(:cozycoder, :ecto_repos), skip: skip_migrations?()},
      {DNSCluster, query: Application.get_env(:cozycoder, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CozyCoder.PubSub},
      # Start a worker by calling: CozyCoder.Worker.start_link(arg)
      # {CozyCoder.Worker, arg},
      # Start to serve requests, typically the last entry
      CozyCoderWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CozyCoder.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CozyCoderWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  defp skip_migrations?() do
    # By default, sqlite migrations are run when using a release
    System.get_env("RELEASE_NAME") == nil
  end
end
