import React from "react";
import { render, cleanup, fireEvent, act, wait } from "@testing-library/react";
import { Settings } from "./Settings";
import { TextInputProps } from "components/shared/TextInput";

jest.mock("providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));
import { useAuth } from "providers/AuthProvider";
import { PasswordFields } from "classes/fields/PasswordFields";
import { UserAttributeFields } from "classes/fields/UserAttributeFields";
const updatePassword = jest.fn();
const updateAttributes = jest.fn();
(useAuth as jest.Mock).mockImplementation(() => ({
  updatePassword: updatePassword,
  updateAttributes: updateAttributes,
}));
updatePassword.mockResolvedValue({});

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

afterEach(() => {
  updatePassword.mockClear();
  updateAttributes.mockClear();
  cleanup();
});
describe("Settings Page tests", () => {
  const setup = () => {
    return render(<Settings />);
  };

  test("It has an input to change the user's first name", () => {
    const { getByTestId } = setup();
    expect(getByTestId("first-name-input")).toBeInTheDocument();
  });

  test("It has an input to change the user's last name", () => {
    const { getByTestId } = setup();
    expect(getByTestId("last-name-input")).toBeInTheDocument();
  });

  test("It has a button to save changes", () => {
    const { getByTestId } = setup();
    expect(getByTestId("save-changes-button")).toBeInTheDocument();
  });

  test("It has a button to change the user's password", () => {
    const { getByTestId } = setup();
    expect(getByTestId("password-change-button")).toBeInTheDocument();
  });

  test("Clicking the change password button brings up the change password inputs", () => {
    const { getByTestId, queryByTestId } = setup();
    const changePasswordButton = getByTestId("password-change-button");

    expect(queryByTestId("old-password-input")).not.toBeInTheDocument();
    expect(queryByTestId("new-password-input")).not.toBeInTheDocument();
    expect(queryByTestId("cancel-password-button")).not.toBeInTheDocument();
    expect(queryByTestId("change-password-button")).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(changePasswordButton);
    });

    expect(queryByTestId("old-password-input")).toBeInTheDocument();
    expect(queryByTestId("new-password-input")).toBeInTheDocument();
    expect(queryByTestId("cancel-password-button")).toBeInTheDocument();
    expect(queryByTestId("change-password-button")).toBeInTheDocument();
  });

  test("Clicking the cancel button closes the change password dialog", () => {
    const { getByTestId, queryByTestId } = setup();
    const changePasswordButton = getByTestId("password-change-button");

    expect(queryByTestId("old-password-input")).not.toBeInTheDocument();
    expect(queryByTestId("new-password-input")).not.toBeInTheDocument();
    expect(queryByTestId("cancel-password-button")).not.toBeInTheDocument();
    expect(queryByTestId("change-password-button")).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(changePasswordButton);
    });

    expect(queryByTestId("old-password-input")).toBeInTheDocument();
    expect(queryByTestId("new-password-input")).toBeInTheDocument();
    expect(queryByTestId("cancel-password-button")).toBeInTheDocument();
    expect(queryByTestId("change-password-button")).toBeInTheDocument();

    const cancelButton = getByTestId("cancel-password-button");

    act(() => {
      fireEvent.click(cancelButton);
    });

    expect(queryByTestId("old-password-input")).not.toBeInTheDocument();
    expect(queryByTestId("new-password-input")).not.toBeInTheDocument();
    expect(queryByTestId("cancel-password-button")).not.toBeInTheDocument();
    expect(queryByTestId("change-password-button")).not.toBeInTheDocument();
  });

  test("Password validation errors work", async () => {
    const { getByTestId, queryByTestId, findByText, queryByText } = setup();
    const changePasswordButton = getByTestId("password-change-button");
    act(() => {
      fireEvent.click(changePasswordButton);
    });

    expect(queryByTestId("change-password-button")).toBeInTheDocument();

    const oldPassInput = getByTestId("old-password-input") as HTMLInputElement;
    const newPassInput = getByTestId("new-password-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "change-password-button"
    ) as HTMLButtonElement;
    act(() => {
      fireEvent.change(oldPassInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });

    expect(
      await findByText(/current password is required/i)
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(oldPassInput, { target: { value: "i" } });
    });

    expect(
      await queryByText(/current password is required/i)
    ).not.toBeInTheDocument();

    expect(await findByText("Password is required")).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPassInput, { target: { value: "a" } });
    });

    expect(await findByText(/at least 8 characters/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPassInput, { target: { value: "abcdefgh" } });
    });

    expect(
      await findByText(/at least one uppercase letter/i)
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPassInput, { target: { value: "aBcdefgh" } });
    });

    expect(await findByText(/at least one number/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(newPassInput, { target: { value: "aBcd3fgh" } });
    });

    expect(await queryByText(/at least one number/i)).not.toBeInTheDocument();
  });

  test("Clicking submit on the password update dialog calls the update password function", async () => {
    updatePassword.mockResolvedValue("Success");

    const { getByTestId } = setup();
    const changePasswordButton = getByTestId("password-change-button");

    act(() => {
      fireEvent.click(changePasswordButton);
    });

    const oldPassInput = getByTestId("old-password-input") as HTMLInputElement;
    const newPassInput = getByTestId("new-password-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "change-password-button"
    ) as HTMLButtonElement;
    act(() => {
      fireEvent.change(oldPassInput, { target: { value: "abcd" } });
      fireEvent.change(newPassInput, { target: { value: "Abcd12345" } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    const passwordChangeForm = new PasswordFields({
      oldPassword: "abcd",
      newPassword: "Abcd12345",
    });
    await wait(
      () => {
        expect(updatePassword).toHaveBeenCalledTimes(1);
        expect(updatePassword).toHaveBeenCalledWith(passwordChangeForm);
      },
      { timeout: 50 }
    );
  });

  test("Clicking submit on the password update dialog and getting an error displays it", async () => {
    updatePassword.mockRejectedValue(new Error("You have an error"));

    const { getByTestId, getByText } = setup();
    const changePasswordButton = getByTestId("password-change-button");

    act(() => {
      fireEvent.click(changePasswordButton);
    });

    const oldPassInput = getByTestId("old-password-input") as HTMLInputElement;
    const newPassInput = getByTestId("new-password-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "change-password-button"
    ) as HTMLButtonElement;
    act(() => {
      fireEvent.change(oldPassInput, { target: { value: "abcd" } });
      fireEvent.change(newPassInput, { target: { value: "Abcd12345" } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });
    const passwordChangeForm = new PasswordFields({
      oldPassword: "abcd",
      newPassword: "Abcd12345",
    });
    await wait(
      () => {
        expect(updatePassword).toHaveBeenCalledTimes(1);
        expect(updatePassword).toHaveBeenCalledWith(passwordChangeForm);
        expect(getByText(/you have an error/i)).toBeInTheDocument();
      },
      { timeout: 50 }
    );
  });

  test("First Name field validation works", async () => {
    const { getByTestId, findByText, queryByText } = setup();

    const firstNameInput = getByTestId("first-name-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "save-changes-button"
    ) as HTMLButtonElement;

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
    expect(await findByText(/first name is required/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "name" } });
    });
    expect(
      await queryByText(/first name is required/i)
    ).not.toBeInTheDocument();
  });

  test("Last Name field validation works", async () => {
    const { getByTestId, findByText, queryByText } = setup();

    const lastNameInput = getByTestId("last-name-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "save-changes-button"
    ) as HTMLButtonElement;

    act(() => {
      fireEvent.change(lastNameInput, { target: { value: "" } });
      fireEvent.click(submitButton);
    });
    expect(await findByText(/last name is required/i)).toBeInTheDocument();

    act(() => {
      fireEvent.change(lastNameInput, { target: { value: "name" } });
    });
    expect(await queryByText(/last name is required/i)).not.toBeInTheDocument();
  });

  test("Submitting profile changes calls updateAttributes", async () => {
    updateAttributes.mockResolvedValue("Success");
    const { getByTestId, findByText, queryByText } = setup();

    const firstNameInput = getByTestId("first-name-input") as HTMLInputElement;
    const lastNameInput = getByTestId("last-name-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "save-changes-button"
    ) as HTMLButtonElement;

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "firstName" } });
      fireEvent.change(lastNameInput, { target: { value: "lastName" } });
      fireEvent.click(submitButton);
    });

    const attributeForm = new UserAttributeFields({
      firstName: "firstName",
      lastName: "lastName",
    });
    await wait(
      () => {
        expect(updateAttributes).toHaveBeenCalledTimes(1);
        expect(updateAttributes).toHaveBeenCalledWith(attributeForm);
      },
      { timeout: 50 }
    );
  });

  test("Submitting profile changes with an error shows the error", async () => {
    updateAttributes.mockRejectedValue(new Error("error message"));
    const { getByTestId, findByText, queryByText } = setup();

    const firstNameInput = getByTestId("first-name-input") as HTMLInputElement;
    const lastNameInput = getByTestId("last-name-input") as HTMLInputElement;
    const submitButton = getByTestId(
      "save-changes-button"
    ) as HTMLButtonElement;

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "firstName" } });
      fireEvent.change(lastNameInput, { target: { value: "lastName" } });
      fireEvent.click(submitButton);
    });

    const attributeForm = new UserAttributeFields({
      firstName: "firstName",
      lastName: "lastName",
    });
    await wait(
      async () => {
        expect(updateAttributes).toHaveBeenCalledTimes(1);
        expect(updateAttributes).toHaveBeenCalledWith(attributeForm);
        expect(await findByText(/error message/i)).toBeInTheDocument();
      },
      { timeout: 50 }
    );
  });
});
