import React from "react";
import clsx from "clsx";
import { InputLabel } from "./InputLabel";
import { HelperText } from "./HelperText";

export interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  helperText?: string;
  label: string;
  id: string;
  error?: boolean;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    helperText,
    label,
    id,
    error,
    className,
    required,
    onFocus,
    onBlur,
    ...inputProps
  } = props;

  const descriptiveID = label + "-input";

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleFocus = (evt: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus && onFocus(evt);
  };

  const handleBlur = (evt: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur && onBlur(evt);
  };

  return (
    <div className={clsx("input-container", className)}>
      <InputLabel error={error} htmlFor={descriptiveID}>
        {label + (required ? "*" : "")}
      </InputLabel>
      <div
        className={clsx(
          "input-box",
          isFocused
            ? error
              ? "border-red-600"
              : "border-primary"
            : error
            ? "border-red-400"
            : "border-gray-500"
        )}
      >
        <textarea
          className={"input"}
          data-testid={descriptiveID}
          autoComplete={"no"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />
      </div>
      <HelperText error={error}>{helperText}</HelperText>
    </div>
  );
};
