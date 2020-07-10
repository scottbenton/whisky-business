import React from "react";
import { act, fireEvent, cleanup, render } from "@testing-library/react";
import { Dialog, DialogProps } from "./Dialog";

afterEach(cleanup);

describe("Dialog Tests", () => {
  const setOpen = jest.fn();
  const defaultProps: DialogProps = {
    open: true,
    setOpen: setOpen,
  };
  const setup = (props?: any) => {
    const combinedProps = { ...defaultProps, ...props };

    return render(<Dialog {...combinedProps} />);
  };

  test("rendering with open=true renders the chidlren", () => {
    const { getByText } = setup({ children: "Hello World" });
    expect(getByText(/hello world/i)).toBeInTheDocument();
  });

  test("rendering with open=false renders nothing", () => {
    const { queryByText } = setup({ children: "Hello World", open: false });
    expect(queryByText(/hello world/i)).not.toBeInTheDocument();
  });

  test("Calling onClick on the backdrop closes the dialog", () => {
    const { container } = setup();
    const scrim = container.firstChild;
    const scrim2 = scrim?.firstChild;
    const card = scrim2?.firstChild;

    expect(scrim).not.toBeNull();
    expect(scrim2).not.toBeNull();
    expect(card).not.toBeNull();

    act(() => {
      if (scrim) {
        fireEvent.click(scrim);
      }
    });

    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);

    act(() => {
      if (scrim2) {
        fireEvent.click(scrim2);
      }
    });

    expect(setOpen).toHaveBeenCalledTimes(2);
    expect(setOpen).toHaveBeenCalledWith(false);

    act(() => {
      if (card) {
        fireEvent.click(card);
      }
    });

    expect(setOpen).toHaveBeenCalledTimes(2);
  });
});
