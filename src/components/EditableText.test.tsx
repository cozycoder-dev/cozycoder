import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@solidjs/testing-library";
import { EditableText } from "./EditableText";

describe("EditableText Component", () => {
  it("renders text in default mode", () => {
    render(() => <EditableText text="Sample Text" />);
    expect(screen.getByText("Sample Text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(() => <EditableText text="Sample Text" className="custom-class" />);
    const textElement = screen.getByText("Sample Text");
    expect(textElement.className).toContain("custom-class");
  });

  it("enters edit mode when clicking on text", () => {
    render(() => <EditableText text="Sample Text" />);
    
    // Click on text to enter edit mode
    fireEvent.click(screen.getByText("Sample Text"));
    
    // Check if input field is now visible
    const inputField = screen.getByDisplayValue("Sample Text");
    expect(inputField).toBeInTheDocument();
    
    // Check if save and cancel buttons are visible
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("updates text when saving in edit mode", () => {
    const onSaveMock = vi.fn();
    render(() => <EditableText text="Sample Text" onSave={onSaveMock} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Sample Text"));
    
    // Change the input value
    const inputField = screen.getByDisplayValue("Sample Text") as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "Updated Text" } });
    
    // Click save
    fireEvent.click(screen.getByText("Save"));
    
    // Check if onSave callback was called with the new value
    expect(onSaveMock).toHaveBeenCalledWith("Updated Text");
    
    // Edit mode should be exited
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  it("exits edit mode when canceling", () => {
    render(() => <EditableText text="Sample Text" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Sample Text"));
    
    // Change the input value
    const inputField = screen.getByDisplayValue("Sample Text") as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "Changed But Not Saved" } });
    
    // Click cancel
    fireEvent.click(screen.getByText("Cancel"));
    
    // Check if text has been reverted
    expect(screen.getByText("Sample Text")).toBeInTheDocument();
    
    // Edit mode should be exited
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  it("submits form when pressing enter in input field", () => {
    const onSaveMock = vi.fn();
    render(() => <EditableText text="Sample Text" onSave={onSaveMock} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Sample Text"));
    
    // Change the input value
    const inputField = screen.getByDisplayValue("Sample Text") as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "Submitted With Enter" } });
    
    // Submit form by pressing Enter
    fireEvent.submit(inputField.closest("form")!);
    
    // Check if onSave callback was called with the new value
    expect(onSaveMock).toHaveBeenCalledWith("Submitted With Enter");
    
    // Edit mode should be exited
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  it("renders textarea when multiline is true", () => {
    // Use simple text without newlines for the test
    render(() => <EditableText text="Multiline Content" multiline={true} />);
    
    // Click on text to enter edit mode
    fireEvent.click(screen.getByText("Multiline Content"));
    
    // Check if textarea is rendered instead of input
    const textareaElement = screen.getByDisplayValue("Multiline Content");
    expect(textareaElement.tagName.toLowerCase()).toBe("textarea");
  });

  it("handles multiline text editing correctly", () => {
    const onSaveMock = vi.fn();
    // Use simple text without newlines for the test
    render(() => <EditableText text="Multiline Content" multiline={true} onSave={onSaveMock} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Multiline Content"));
    
    // Change the textarea value
    const textareaElement = screen.getByDisplayValue("Multiline Content") as HTMLTextAreaElement;
    fireEvent.input(textareaElement, { target: { value: "Updated Multiline Content" } });
    
    // Click save
    fireEvent.click(screen.getByText("Save"));
    
    // Check if onSave callback was called with the new value
    expect(onSaveMock).toHaveBeenCalledWith("Updated Multiline Content");
  });
});