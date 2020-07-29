import React from "react";
import { CardProps, Card } from "../Card";
import { Backdrop } from "../Backdrop";
import clsx from "clsx";

export interface DialogProps extends CardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { open, setOpen, className, ...cardProps } = props;

  if (!open) {
    return <> </>;
  } else {
    return (
      <Backdrop onClick={() => setOpen(false)}>
        <Card
          className={clsx("z-50 shadow-2xl max-w-2xl w-full", className)}
          {...cardProps}
        />
      </Backdrop>
    );
  }
};
