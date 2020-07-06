import React from "react";
import { render, cleanup, fireEvent, act, wait } from "@testing-library/react";
import { RegistrationComponent } from "./RegistrationComponent";

jest.mock("providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));
import { useAuth } from "providers/AuthProvider";
const signUp = jest.fn();
(useAuth as jest.Mock).mockImplementation(() => ({
  signUp: signUp,
}));
signUp.mockResolvedValue({});

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
    return render(<RegistrationComponent />);
  };

  test("It has an input for first name", () => {
    const { getByTestId } = setup();
    expect(getByTestId("first-name-input")).toBeInTheDocument();
  });

  test("It has an input for last name", () => {
    const { getByTestId } = setup();
    expect(getByTestId("last-name-input")).toBeInTheDocument();
  });

  test("It has an input for email", () => {
    const { getByTestId } = setup();
    expect(getByTestId("email-input")).toBeInTheDocument();
  });

  test("It has an input for password", () => {
    const { getByTestId } = setup();
    expect(getByTestId("password-input")).toBeInTheDocument();
  });

  test("It has a second input for password", () => {
    const { getByTestId } = setup();
    expect(getByTestId("password-confirm-input")).toBeInTheDocument();
  });

  test("It has a cancel button", () => {
    const { getByTestId } = setup();
    expect(getByTestId("cancel-button")).toBeInTheDocument();
  });

  test("It has a create account button", () => {
    const { getByTestId } = setup();
    expect(getByTestId("create-account-button")).toBeInTheDocument();
  });

  test("It shows first name validation errors", async () => {
    const { getByTestId, findByText } = setup();
    const firstNameInput = getByTestId("first-name-input") as HTMLInputElement;
    const form = getByTestId("registration-form") as HTMLFormElement;
    expect(firstNameInput.value).toBe("");

    act(() => {
      fireEvent.submit(form);
    });
    expect(await findByText(/first name is required/i)).toBeInTheDocument();
  });

  test("It shows last name validation errors", async () => {
    const { getByTestId, findByText } = setup();
    const lastNameInput = getByTestId("last-name-input") as HTMLInputElement;
    const form = getByTestId("registration-form") as HTMLFormElement;
    expect(lastNameInput.value).toBe("");

    act(() => {
      fireEvent.submit(form);
    });
    expect(await findByText(/last name is required/i)).toBeInTheDocument();
  });

  test("It shows email validation errors", async () => {
    const { getByTestId, findByText, queryByText } = setup();
    const emailInput = getByTestId("email-input") as HTMLInputElement;
    const form = getByTestId("registration-form") as HTMLFormElement;
    expect(emailInput.value).toBe("");

    act(() => {
      fireEvent.submit(form);
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott@" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott@scottbenton" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott@scottbenton." } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    expect(await queryByText(/invalid email/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "@scottbenton.dev" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();
  });

  test("It shows password validation errors", async () => {
    const { getByTestId, findByText } = setup();
    const password = getByTestId("password-input") as HTMLInputElement;
    const form = getByTestId("registration-form") as HTMLFormElement;
    expect(password.value).toBe("");

    act(() => {
      fireEvent.submit(form);
    });
    expect(await findByText(/password is required/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(password, { target: { value: "a" } });
    });
    expect(await findByText(/8 characters/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(password, { target: { value: "abcdefgh" } });
    });
    expect(
      await findByText(/at least one uppercase letter/i)
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(password, { target: { value: "Abcdefgh" } });
    });
    expect(await findByText(/at least one number/i)).toBeInTheDocument();
  });

  test("It shows confirm password validation errors", async () => {
    const { getByTestId, findByText, queryByText } = setup();
    const password = getByTestId("password-input") as HTMLInputElement;
    const confirmPassword = getByTestId(
      "password-confirm-input"
    ) as HTMLInputElement;
    const form = getByTestId("registration-form") as HTMLFormElement;
    expect(password.value).toBe("");

    act(() => {
      fireEvent.submit(form);
    });
    expect(await findByText(/password is required/i)).toBeInTheDocument();
    expect(await findByText(/passwords must match/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(password, { target: { value: "a" } });
    });
    expect(await findByText(/passwords must match/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(confirmPassword, { target: { value: "a" } });
    });
    expect(await queryByText(/passwords must match/i)).not.toBeInTheDocument();
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

  test("Hitting create account doesn't work unless the form is filled out", () => {
    const { getByTestId } = setup();
    const submitButton = getByTestId("create-account-button");

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(signUp).not.toHaveBeenCalled();
  });

  test("Hitting create account with all the fields filled out calls register", async () => {
    const { getByTestId, debug } = setup();
    const submitButton = getByTestId("create-account-button");
    const firstNameInput = getByTestId("first-name-input");
    const lastNameInput = getByTestId("last-name-input");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const confirmPasswordInput = getByTestId("password-confirm-input");

    const dto = new RegistrationForm({
      firstName: "John",
      lastName: "Doe",
      email: "John@doe.com",
      password: "1234AbCd",
      confirmPassword: "1234AbCd",
    });

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: dto.firstName } });
      fireEvent.change(lastNameInput, { target: { value: dto.lastName } });
      fireEvent.change(emailInput, { target: { value: dto.email } });
      fireEvent.change(passwordInput, { target: { value: dto.password } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: dto.confirmPassword },
      });
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    await wait(
      () => {
        expect(signUp).toHaveBeenCalledTimes(1);
        expect(signUp).toHaveBeenCalledWith(dto);
      },
      { timeout: 50 }
    );
  });
});
