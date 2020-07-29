import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { ViewShow, ViewHide } from "react-zondicons";
import { InputAdornment } from "./InputAdornment";
import { InputLabel } from "./InputLabel";
import { HelperText } from "./HelperText";

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  helperText?: string;
  label?: string;
  id: string;
  error?: boolean;
  className?: string;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    onChange,
    helperText,
    label,
    id,
    required,
    error,
    className,
    type,
    onFocus,
    onBlur,
    startAdornment,
    endAdornment,
    ...otherProps
  } = props;
  const { maxLength } = props;

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [inputLength, setInputLength] = React.useState<number>(0);
  const [currentType, setCurrentType] = React.useState<string | undefined>(
    type
  );

  const togglePasswordType = () => {
    setCurrentType((prevType) => {
      if (prevType === "password") {
        return "text";
      }
      return "password";
    });
  };

  let helpers = helperText;
  if (maxLength) {
    helpers = inputLength + "/" + maxLength;
  }

  let descriptiveID = id + "-input";

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputLength(evt.target.value.length);
    onChange && onChange(evt);
  };

  const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus && onFocus(evt);
  };

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur && onBlur(evt);
  };

  return (
    <div className={clsx("input-container", className)}>
      {label && (
        <InputLabel error={error} htmlFor={descriptiveID}>
          {label + (required ? "*" : "")}
        </InputLabel>
      )}
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
        {/* <div
          className={clsx(
            "overflow-hidden border w-full rounded-lg flex",
            isFocused
              ? error
                ? "border-red-600"
                : "border-primary"
              : error
              ? "border-red-400"
              : ""
          )}
        > */}
        {startAdornment}
        <input
          className={"input"}
          data-testid={descriptiveID}
          id={descriptiveID}
          onChange={handleChange}
          autoComplete={"no"}
          type={currentType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...otherProps}
        />
        {type === "password" ? (
          <InputAdornment
            id={"toggle-password-show"}
            onClick={togglePasswordType}
          >
            {currentType === "password" ? <ViewHide /> : <ViewShow />}
          </InputAdornment>
        ) : (
          endAdornment
        )}
      </div>
      <HelperText error={error}>{helpers}</HelperText>
    </div>
  );
};
