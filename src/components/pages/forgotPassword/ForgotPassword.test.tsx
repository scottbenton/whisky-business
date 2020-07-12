import React from "react";
import {
  act,
  fireEvent,
  render,
  cleanup,
  wait,
  findByText,
} from "@testing-library/react";
import { ForgotPassword } from "./ForgotPassword";
import { ForgotPasswordFields } from "classes/fields/ForgotPasswordFields";

jest.mock("providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));
import { useAuth } from "providers/AuthProvider";
const forgotPassword = jest.fn();
const forgotPasswordSubmit = jest.fn();
(useAuth as jest.Mock).mockImplementation(() => ({
  forgotPassword: forgotPassword,
  forgotPasswordSubmit: forgotPasswordSubmit,
}));

afterEach(() => {
  cleanup();
  forgotPassword.mockClear();
  forgotPasswordSubmit.mockClear();
});
describe("Forgot Password Tests", () => {
  const setup = () => {
    return render(<ForgotPassword />);
  };

  test("Forgot password has an email input to get the user's username", () => {
    const { getByTestId } = setup();
    expect(getByTestId("email-input")).toBeInTheDocument();
  });

  test("Forgot password has a continue button to get to the next step", () => {
    const { getByTestId } = setup();
    expect(getByTestId("continue-button")).toBeInTheDocument();
  });

  test("Email validation errors work", async () => {
    const { getByTestId, findByText, queryByText, debug } = setup();
    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott" } });
    });
    act(() => {
      fireEvent.click(continueButton);
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott@" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scottbenton.dev" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: "scott@scottbenton" } });
    });
    expect(await findByText(/invalid email/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    expect(await queryByText(/invalid email/i)).not.toBeInTheDocument();
  });

  test("Clicking continue calls forgot password", () => {
    forgotPassword.mockResolvedValue("string");
    const { getByTestId } = setup();

    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    wait(
      () => {
        expect(forgotPassword).toHaveBeenCalledTimes(1);
        expect(forgotPassword).toHaveBeenCalledWith("scott@scottbenton.dev");
      },
      { interval: 500 }
    );
  });

  test("Clicking continue calls forgot password", () => {
    forgotPassword.mockResolvedValue("string");
    const { getByTestId } = setup();

    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    wait(
      () => {
        expect(forgotPassword).toHaveBeenCalledTimes(1);
        expect(forgotPassword).toHaveBeenCalledWith("scott@scottbenton.dev");
      },
      { interval: 500 }
    );
  });

  test("If forgotPassword throws an error, its displayed", async () => {
    forgotPassword.mockRejectedValue(new Error("This is an error"));
    const { getByTestId, findByText } = setup();

    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });
    expect(await findByText(/this is an error/i)).toBeInTheDocument();
  });

  test("Hitting continue brings up a code field, a newPassword field, and a submit button", async () => {
    forgotPassword.mockResolvedValue("string");
    const { getByTestId, findByTestId } = setup();
    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    expect(await findByTestId("code-input")).toBeInTheDocument();
    expect(await findByTestId("new-password-input")).toBeInTheDocument();
    expect(await findByTestId("finalize-button")).toBeInTheDocument();
  });

  test("Code validation works", async () => {
    forgotPassword.mockResolvedValue("string");
    const { getByTestId, findByTestId, findByText, queryByText } = setup();
    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    expect(await findByTestId("code-input")).toBeInTheDocument();
    expect(await findByTestId("finalize-button")).toBeInTheDocument();
    const codeInput = getByTestId("code-input");
    const finalizeButton = getByTestId("finalize-button");

    act(() => {
      fireEvent.blur(codeInput);
    });

    expect(await findByText(/code is required/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(codeInput, { target: { value: "code" } });
    });

    expect(queryByText(/code is required/i)).not.toBeInTheDocument();
  });

  test("Password validation works", async () => {
    forgotPassword.mockResolvedValue("string");
    const { getByTestId, findByTestId, findByText, queryByText } = setup();
    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });
    expect(await findByTestId("new-password-input")).toBeInTheDocument();
    expect(await findByTestId("finalize-button")).toBeInTheDocument();
    const newPasswordInput = getByTestId("new-password-input");
    const finalizeButton = getByTestId("finalize-button");

    act(() => {
      fireEvent.blur(newPasswordInput);
    });

    expect(await findByText(/password is required/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: "code" } });
    });

    expect(await findByText(/at least 8 characters/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: "codecode" } });
    });

    expect(
      await findByText(/at least one uppercase letter/i)
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: "codeCode" } });
    });

    expect(await findByText(/at least one number/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: "codeCode1" } });
    });

    expect(queryByText(/at least one number/i)).not.toBeInTheDocument();
  });

  test("Submitting second page calls passwordChangeSubmit", async () => {
    forgotPassword.mockResolvedValue("string");
    forgotPasswordSubmit.mockResolvedValue("string");
    const { getByTestId, findByTestId, findByText, queryByText } = setup();
    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });
    expect(await findByTestId("new-password-input")).toBeInTheDocument();
    expect(await findByTestId("code-input")).toBeInTheDocument();
    expect(await findByTestId("finalize-button")).toBeInTheDocument();
    const newPasswordInput = getByTestId("new-password-input");
    const codeInput = getByTestId("code-input");
    const finalizeButton = getByTestId("finalize-button");

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: "Hunter11" } });
      fireEvent.change(codeInput, { target: { value: "code" } });
    });
    act(() => {
      fireEvent.click(finalizeButton);
    });

    const dto = new ForgotPasswordFields({
      email: "scott@scottbenton.dev",
      newPassword: "Hunter11",
      code: "code",
    });

    wait(
      () => {
        expect(forgotPasswordSubmit).toHaveBeenCalledTimes(1);
        expect(forgotPasswordSubmit).toHaveBeenCalledWith(dto);
      },
      { timeout: 500 }
    );
  });

  test("If the submit throws an error it shows up", async () => {
    forgotPassword.mockResolvedValue("string");
    forgotPasswordSubmit.mockRejectedValue(new Error("Ey I'm an error"));
    const { getByTestId, findByTestId, findByText, queryByText } = setup();
    const emailInput = getByTestId("email-input");
    const continueButton = getByTestId("continue-button");

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "scott@scottbenton.dev" },
      });
    });
    act(() => {
      fireEvent.click(continueButton);
    });

    expect(await findByTestId("new-password-input")).toBeInTheDocument();
    expect(await findByTestId("code-input")).toBeInTheDocument();
    expect(await findByTestId("finalize-button")).toBeInTheDocument();
    const newPasswordInput = getByTestId("new-password-input");
    const codeInput = getByTestId("code-input");
    const finalizeButton = getByTestId("finalize-button");

    act(() => {
      fireEvent.change(newPasswordInput, { target: { value: "Hunter11" } });
      fireEvent.change(codeInput, { target: { value: "code" } });
    });
    act(() => {
      fireEvent.click(finalizeButton);
    });
    expect(await findByText(/Ey I'm an error/i)).toBeInTheDocument();
  });
});
