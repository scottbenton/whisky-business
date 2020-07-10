import React, { ButtonHTMLAttributes, Attributes, MouseEvent } from "react";
import { usePopper } from "react-popper";
import clsx from "clsx";
import { useTransition, animated } from "react-spring";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  icon: React.FunctionComponent | React.ComponentClass | string;
  variant?: "tertiary" | "secondary" | "primary";
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
    variant = "tertiary",
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
    "h-12 w-12 rounded-full flex justify-center items-center focus:outline-none"
  );

  switch (variant) {
    case "primary":
      classes = clsx(
        classes,
        "bg-green-300 border-2 border-green-500 hover:bg-green-400 shadow-md text-green-900 shadow-md hover:shadow-2xl"
      );
      break;
    case "secondary":
      classes = clsx(
        classes,
        "border-2 border-green-500 focus:border-green-700 text-green-700 hover:bg-opacity-50 hover:bg-green-300"
      );
      break;
    case "tertiary":
      classes = clsx(
        classes,
        "focus:border-gray-700 hover:bg-opacity-25 hover:bg-gray-900"
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
        } as Attributes)}
      </button>
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
