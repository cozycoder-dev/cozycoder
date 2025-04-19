import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@solidjs/testing-library";
import { Prompt, PromptData } from "./prompt";

describe("Prompt Component", () => {
  const mockPrompt: PromptData = {
    title: "Test Title",
    content: "Test content for the prompt component",
    updated_at: "2023-01-01 12:00 UTC",
  };

  it("renders the prompt with correct title and content", () => {
    render(() => <Prompt prompt={mockPrompt} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(
      screen.getByText("Test content for the prompt component"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Modified: 2023-01-01 12:00 UTC"),
    ).toBeInTheDocument();
  });

  it("enters edit mode when clicking on title", () => {
    render(() => <Prompt prompt={mockPrompt} />);

    // Click on title to enter edit mode
    fireEvent.click(screen.getByText("Test Title"));

    // Check if input field is now visible
    const inputField = screen.getByDisplayValue("Test Title");
    expect(inputField).toBeInTheDocument();

    // Check if save and cancel buttons are visible
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("updates title when saving in edit mode", () => {
    render(() => <Prompt prompt={mockPrompt} />);

    // Enter edit mode
    fireEvent.click(screen.getByText("Test Title"));

    // Change the input value
    const inputField = screen.getByDisplayValue(
      "Test Title",
    ) as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "Updated Title" } });

    // Click save
    fireEvent.click(screen.getByText("Save"));

    // Check if title has been updated
    expect(screen.getByText("Updated Title")).toBeInTheDocument();
    // Edit mode should be exited
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  it("exits edit mode when canceling", () => {
    render(() => <Prompt prompt={mockPrompt} />);

    // Enter edit mode
    fireEvent.click(screen.getByText("Test Title"));

    // Change the input value
    const inputField = screen.getByDisplayValue(
      "Test Title",
    ) as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "Changed But Not Saved" } });

    // Click cancel
    fireEvent.click(screen.getByText("Cancel"));

    // Check if title has been reverted
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Edit mode should be exited
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  it("submits form when pressing enter in input field", () => {
    render(() => <Prompt prompt={mockPrompt} />);

    // Enter edit mode
    fireEvent.click(screen.getByText("Test Title"));

    // Change the input value
    const inputField = screen.getByDisplayValue(
      "Test Title",
    ) as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "Submitted With Enter" } });

    // Submit form by pressing Enter
    fireEvent.submit(inputField.closest("form")!);

    // Check if title has been updated
    expect(screen.getByText("Submitted With Enter")).toBeInTheDocument();
    // Edit mode should be exited
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });
});
