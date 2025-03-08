import { render, fireEvent, screen } from "@solidjs/testing-library";
import MessageInput from "./MessageInput";
import { test, expect, vi } from "vitest";

test("MessageInput: renders with default placeholder", () => {
    const onSubmit = vi.fn();
    render(() => <MessageInput onSubmit={onSubmit} />);

    expect(
      screen.getByPlaceholderText("Type your message..."),
    ).toBeInTheDocument();
});

test("MessageInput: renders with custom placeholder", () => {
    const onSubmit = vi.fn();
    const customPlaceholder = "Enter your prompt...";
    render(() => (
      <MessageInput onSubmit={onSubmit} placeholder={customPlaceholder} />
    ));

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
});

test("MessageInput: updates input value when typing", async () => {
    const onSubmit = vi.fn();
    const { getByPlaceholderText } = render(() => (
      <MessageInput onSubmit={onSubmit} />
    ));

    const input = getByPlaceholderText("Type your message...");
    fireEvent.input(input, { target: { value: "Hello world" } });

    expect(input).toHaveValue("Hello world");
});

test("MessageInput: calls onSubmit when form is submitted", async () => {
    const onSubmit = vi.fn();
    const { getByPlaceholderText, getByText } = render(() => (
      <MessageInput onSubmit={onSubmit} />
    ));

    const input = getByPlaceholderText("Type your message...");
    fireEvent.input(input, { target: { value: "Test message" } });

    const submitButton = getByText("Send");
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith("Test message");
    expect(input).toHaveValue(""); // Input should be cleared
});

test("MessageInput: does not call onSubmit when message is empty", async () => {
    const onSubmit = vi.fn();
    const { getByText } = render(() => <MessageInput onSubmit={onSubmit} />);

    const submitButton = getByText("Send");
    fireEvent.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
});

test("MessageInput: handles Enter key to submit", async () => {
    const onSubmit = vi.fn();
    const { getByPlaceholderText } = render(() => (
      <MessageInput onSubmit={onSubmit} />
    ));

    const input = getByPlaceholderText("Type your message...");
    fireEvent.input(input, { target: { value: "Enter message" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledWith("Enter message");
});

test("MessageInput: does not submit when pressing Shift+Enter", async () => {
    const onSubmit = vi.fn();
    const { getByPlaceholderText } = render(() => (
      <MessageInput onSubmit={onSubmit} />
    ));

    const input = getByPlaceholderText("Type your message...");
    fireEvent.input(input, { target: { value: "Shift+Enter message" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });

    expect(onSubmit).not.toHaveBeenCalled();
});

test("MessageInput: disables the input and button during submission", async () => {
    // Create a promise we can control to simulate async submission
    let resolveSubmit!: () => void;
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });

    const onSubmit = vi.fn().mockImplementation(() => submitPromise);
    const { getByPlaceholderText, getByText } = render(() => (
      <MessageInput onSubmit={onSubmit} />
    ));

    const input = getByPlaceholderText("Type your message...");
    fireEvent.input(input, { target: { value: "Submit test" } });

    const submitButton = getByText("Send");
    fireEvent.click(submitButton);

    // During submission
    expect(getByText("Sending...")).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(submitButton).toBeDisabled();

    // Resolve the submission
    resolveSubmit();

    // Wait for the submission to complete
    await submitPromise;
});

test("MessageInput: renders with initial value", () => {
    const onSubmit = vi.fn();
    const initialValue = "Initial message";
    const { getByPlaceholderText } = render(() => (
      <MessageInput onSubmit={onSubmit} initialValue={initialValue} />
    ));

    const input = getByPlaceholderText("Type your message...");
    expect(input).toHaveValue(initialValue);
});

test("MessageInput: applies custom container class", () => {
    const onSubmit = vi.fn();
    const customClass = "custom-container-class";
    const { container } = render(() => (
      <MessageInput onSubmit={onSubmit} containerClass={customClass} />
    ));

    expect(container.querySelector(`.${customClass}`)).toBeInTheDocument();
});
