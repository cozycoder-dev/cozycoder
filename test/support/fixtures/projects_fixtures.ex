defmodule CozyCoder.ProjectsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CozyCoder.Projects` context.
  """

  @doc """
  Generate a project.
  """
  def project_fixture(attrs \\ %{}) do
    {:ok, project} =
      attrs
      |> Enum.into(%{
        git_url: "https://github.com/example/repo",
        name: "some name"
      })
      |> CozyCoder.Projects.create_project()

    project
  end
end
