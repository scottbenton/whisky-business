import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { RegistrationComponent } from "./RegistrationComponent";
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
});
