defmodule CozyCoder.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "projects" do
    field :name, :string
    field :git_url, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :git_url])
    |> validate_required([:name, :git_url])
    |> validate_github_url()
  end

  defp validate_github_url(changeset) do
    validate_change(changeset, :git_url, fn :git_url, git_url ->
      if String.starts_with?(git_url, "https://github.com/") do
        []
      else
        [git_url: "must be a GitHub URL (https://github.com/...)"]
      end
    end)
  end
end
