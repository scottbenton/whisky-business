import React from "react";
import { act, fireEvent, render, cleanup } from "@testing-library/react";
import { Avatar, AvatarProps } from "./Avatar";
import { UserDTO } from "classes/dto/UserDTO";

afterEach(cleanup);

describe("Avatar Tests.", () => {
  const setup = (props: AvatarProps) => {
    return render(<Avatar {...props} />);
  };

  test("Passing nothing renders a blank avatar", () => {
    const { getByTestId } = setup({});
    expect(getByTestId("blank-svg")).toBeInTheDocument();
  });

  test("Passing a user display's the user's initials", () => {
    const user = new UserDTO("Test", "User", "asdf", "asdf");
    const { getByText } = setup({ user: user });
    expect(getByText(/tu/i)).toBeInTheDocument();
  });

  test("The base element is a div", () => {
    const { container } = setup({});
    expect(container.querySelector("div")).toBeTruthy();
  });
});
