import React, { ButtonHTMLAttributes, Attributes, MouseEvent } from "react";
import { usePopper } from "react-popper";
import clsx from "clsx";
import { useTransition, animated } from "react-spring";
import Ripples from "react-ripples";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  icon: React.FunctionComponent | React.ComponentClass | string;
  color?: "primary" | "inherit";
  id: string;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    tooltip,
    children,
    id,
    className,
    icon,
    onClick,
    color = "inherit",
    ...buttonProps
  } = props;

  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const [buttonElement, setButtonElement] = React.useState<Element | null>(
    null
  );
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(
    null
  );

  const { styles, attributes } = usePopper(buttonElement, popperElement);

  const transition = useTransition(showTooltip, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 250,
    },
  });

  let classes = clsx(
    className,
    "h-12 w-12 rounded-full flex justify-center items-center focus:outline-none transition-all duration-300 ease-in-out"
  );

  switch (color) {
    case "primary":
      classes = clsx(
        classes,
        " border-2 border-transparent hover:bg-smoke-lightest text-primary-dark hover:shadow-lg focus:border-primary-darkest"
      );
      break;
    case "inherit":
      classes = clsx(
        classes,
        "border-2 border-transparent focus:border-primary-darkest hover:bg-smoke-lightest"
      );
      break;
  }

  const descriptiveId = id + "-button";

  const handleClick = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.currentTarget.blur();
    onClick && onClick(evt);
  };

  return (
    <>
      <Ripples
        during={500}
        color={"rgba(0, 0, 0, .3)"}
        className={"overflow-hidden rounded-full"}
      >
        <button
          ref={setButtonElement}
          id={descriptiveId}
          data-testid={descriptiveId}
          className={classes}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleClick}
          {...buttonProps}
        >
          {React.createElement(icon, {
            "data-testid": "icon",
            className: "fill-current",
            size: 24,
          } as Attributes)}
        </button>
      </Ripples>
      {transition.map(
        ({ item, props, key }) =>
          item &&
          tooltip && (
            <animated.div
              ref={setPopperElement}
              key={key}
              style={{ ...props, ...styles.popper }}
              {...attributes.popper}
              className={"p-1"}
            >
              <span
                className={
                  "bg-gray-900 bg-opacity-75 text-white text-sm px-2 py-1 text-sm rounded-lg"
                }
              >
                {tooltip}
              </span>
            </animated.div>
          )
      )}
    </>
  );
};
