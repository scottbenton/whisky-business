import React, { HTMLProps } from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { TextInput, TextInputProps } from "./TextInput";
afterEach(cleanup);

describe("TextInput Tests", () => {
  const DEFAULT_PROPS: React.PropsWithChildren<
    TextInputProps & HTMLProps<HTMLInputElement>
  > = {
    label: "Test Input",
    id: "test",
  };

  const setup = (
    overwriteProps?: React.PropsWithChildren<
      TextInputProps & HTMLProps<HTMLInputElement>
    >
  ) => {
    const textInputProps: React.PropsWithChildren<
      TextInputProps & HTMLProps<HTMLInputElement>
    > = {
      ...overwriteProps,
      ...DEFAULT_PROPS,
    };
    const utils = render(<TextInput {...textInputProps} />);

    const inputRegex = new RegExp(textInputProps.label, "gi");
    const input = utils.getByLabelText(inputRegex) as HTMLInputElement;
    return { input, ...utils };
  };

  test("It adds a label", () => {
    const { getByLabelText } = setup();

    expect(getByLabelText("Test Input")).toBeInTheDocument();
  });

  test("It adds a test-id", () => {
    const { getByTestId } = setup();

    expect(getByTestId("test-input")).toBeInTheDocument();
  });

  test("It renders a value in the text field", () => {
    const { input } = setup({
      value: "Hello",
      ...DEFAULT_PROPS,
    });

    expect(input.value).toBe("Hello");
  });

  test("It updates the value when a change is made", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "World" } });
    expect(input.value).toBe("World");
  });

  test("It displays the helper text when passed in", () => {
    const { getByText } = setup({
      helperText: "Hello World",
      ...DEFAULT_PROPS,
    });

    expect(getByText("Hello World")).toBeInTheDocument();
  });

  test("It adds helper text if a max length is present", () => {
    const { getByText, input } = setup({
      maxLength: 50,
      ...DEFAULT_PROPS,
    });

    expect(getByText("0/50")).toBeInTheDocument();
    act(() => {
      fireEvent.change(input, { target: { value: "World" } });
    });
    expect(getByText("5/50")).toBeInTheDocument();
  });

  test("It adds a * to the label if the field is required", () => {
    const { getByLabelText } = setup({ required: true, ...DEFAULT_PROPS });

    expect(getByLabelText(/Test Input*/gi)).toBeInTheDocument();
  });
});
