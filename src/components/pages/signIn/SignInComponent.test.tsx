import React from "react";
import { render, cleanup, fireEvent, act, wait } from "@testing-library/react";
import { SignInComponent } from "./SignInComponent";

jest.mock("providers/AuthenticationProvider", () => ({
  useAuthentication: jest.fn(),
}));
import { useAuthentication } from "providers/AuthenticationProvider";
const signIn = jest.fn();
(useAuthentication as jest.Mock).mockImplementation(() => ({
  signIn: signIn,
}));
signIn.mockResolvedValue({});

jest.mock("react-router-dom", () => ({ useHistory: jest.fn() }));
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import { TextInputProps } from "components/shared/TextInput";
import { SignInForm } from "classes/fields/SignInForm";
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
    return render(<SignInComponent />);
  };

  test("It has an input for email", () => {
    const { getByTestId } = setup();
    expect(getByTestId("email-input")).toBeInTheDocument();
  });
  test("It has an input for password", () => {
    const { getByTestId } = setup();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  test("It has a cancel button", () => {
    const { getByTestId } = setup();
    expect(getByTestId("cancel-button")).toBeInTheDocument();
  });

  test("It has a sign in button", () => {
    const { getByTestId } = setup();
    expect(getByTestId("sign-in-button")).toBeInTheDocument();
  });

  test("Hitting cancel reroutes the user to the home page", () => {
    const { getByTestId } = setup();
    const cancelButton = getByTestId("cancel-button");

    act(() => {
      fireEvent.click(cancelButton);
    });

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(pageConfig.home.path);
  });

  test("Hitting log in doesn't work unless the form is filled out", async () => {
    const { getByTestId } = setup();
    const submitButton = getByTestId("sign-in-button");

    act(() => {
      fireEvent.click(submitButton);
    });

    await wait(
      () => {
        expect(signIn).not.toHaveBeenCalled();
      },
      { timeout: 50 }
    );
  });

  test("Hitting create account with all the fields filled out calls register", async () => {
    const { getByTestId } = setup();
    const submitButton = getByTestId("sign-in-button");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");

    const dto = new SignInForm({
      email: "John@doe.com",
      password: "1234AbCd",
    });

    act(() => {
      fireEvent.change(emailInput, { target: { value: dto.email } });
      fireEvent.change(passwordInput, { target: { value: dto.password } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    await wait(
      () => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith(dto);
      },
      { timeout: 50 }
    );
  });
});
