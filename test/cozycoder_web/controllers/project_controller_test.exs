defmodule CozyCoderWeb.ProjectControllerTest do
  use CozyCoderWeb.ConnCase

  import CozyCoder.ProjectsFixtures
  alias CozyCoder.Projects.Project

  @create_attrs %{
    name: "some name",
    git_url: "https://github.com/cozycoder-dev/codzycoder"
  }
  @update_attrs %{
    name: "some updated name",
    git_url: "https://github.com/cozycoder-dev/codzycoder.dev"
  }
  @invalid_attrs %{name: nil, git_url: nil}
  @non_github_attrs %{
    name: "some name",
    git_url: "https://gitlab.com/some/repo"
  }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all projects", %{conn: conn} do
      conn = get(conn, ~p"/api/projects")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create project" do
    test "renders project when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/projects", project: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/projects/#{id}")

      assert %{
               "id" => ^id,
               "git_url" => "https://github.com/cozycoder-dev/codzycoder",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/projects", project: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders errors when git_url is not a GitHub URL", %{conn: conn} do
      conn = post(conn, ~p"/api/projects", project: @non_github_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update project" do
    setup [:create_project]

    test "renders project when data is valid", %{conn: conn, project: %Project{id: id} = project} do
      conn = put(conn, ~p"/api/projects/#{project}", project: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/projects/#{id}")

      assert %{
               "id" => ^id,
               "git_url" => "https://github.com/cozycoder-dev/codzycoder.dev",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, project: project} do
      conn = put(conn, ~p"/api/projects/#{project}", project: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "renders errors when git_url is not a GitHub URL", %{conn: conn, project: project} do
      conn = put(conn, ~p"/api/projects/#{project}", project: @non_github_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete project" do
    setup [:create_project]

    test "deletes chosen project", %{conn: conn, project: project} do
      conn = delete(conn, ~p"/api/projects/#{project}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/projects/#{project}")
      end
    end
  end

  defp create_project(_) do
    project = project_fixture()

    %{project: project}
  end
end
