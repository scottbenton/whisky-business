import React from "react";
import { render, cleanup, fireEvent, act, wait } from "@testing-library/react";
import { ConfirmRegistration } from "./ConfirmRegistration";

jest.mock("providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));
import { useAuth } from "providers/AuthProvider";
const confirmCode = jest.fn();
(useAuth as jest.Mock).mockImplementation(() => ({
  confirmCode: confirmCode,
}));
confirmCode.mockResolvedValue({});

jest.mock("react-router-dom", () => ({ useHistory: jest.fn() }));
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import { TextInputProps } from "components/shared/TextInput";
const push = jest.fn();
(useHistory as jest.Mock).mockImplementation(() => ({
  push: push,
}));

jest.mock("components/shared/TextInput/TextInput", () => ({
  TextInput: (props: TextInputProps) => {
    const { id, helperText, error, ...otherProps } = props;
    return (
      <>
        <input id={id + "-input"} data-testid={id + "-input"} {...otherProps} />
        <span>{helperText}</span>
      </>
    );
  },
}));

afterEach(cleanup);

describe("TextInput Tests", () => {
  const setup = () => {
    return render(<ConfirmRegistration email={"test@test.com"} />);
  };

  test("It has an input for the code", () => {
    const { getByTestId } = setup();
    expect(getByTestId("code-input")).toBeInTheDocument();
  });

  test("It has a confirm button", () => {
    const { getByTestId } = setup();
    expect(getByTestId("validate-button")).toBeInTheDocument();
  });

  test("Hitting confirm calls confirmCode", async () => {
    const { getByTestId } = setup();
    const submitButton = getByTestId("validate-button");
    const codeInput = getByTestId("code-input");

    act(() => {
      fireEvent.change(codeInput, { target: { value: "123456" } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    await wait(
      () => {
        expect(confirmCode).toHaveBeenCalledTimes(1);
        expect(confirmCode).toHaveBeenCalledWith("test@test.com", "123456");
      },
      { timeout: 50 }
    );
  });
});
