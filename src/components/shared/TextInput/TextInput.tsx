import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { ViewShow, ViewHide } from "react-zondicons";
import { InputAdornment } from "./InputAdornment";

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  helperText?: string;
  label: string;
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
    <div className={clsx("flex flex-col w-full pt-2 pb-2", className)}>
      <label
        className={clsx(
          "pl-1 pb-1 text-sm font-bold",
          error ? "text-red-600" : "text-gray-700"
        )}
        htmlFor={descriptiveID}
      >
        {label + (required ? "*" : "")}
      </label>
      <div className={"shadow rounded-lg w-full"}>
        <div
          className={clsx(
            "overflow-hidden border-2 w-full rounded-lg flex",
            isFocused
              ? error
                ? "border-red-600"
                : "border-green-400"
              : error
              ? "border-red-400"
              : ""
          )}
        >
          {startAdornment}
          <input
            className={clsx(
              "w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            )}
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
              {" "}
              {currentType === "password" ? <ViewHide /> : <ViewShow />}
            </InputAdornment>
          ) : (
            endAdornment
          )}
        </div>
      </div>
      <span
        className={clsx(
          "text-sm pt-1 pl-1",
          error ? "text-red-600" : "text-gray-700"
        )}
      >
        {helpers}
      </span>
    </div>
  );
};
