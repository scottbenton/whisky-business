import React from "react";
import { Field } from "react-final-form";
import { TextInput, TextInputProps } from "./TextInput";

export interface TextInputFormFieldProps extends TextInputProps {
  fieldName: string;
}

export const TextInputFormField: React.FC<TextInputFormFieldProps> = (
  props
) => {
  const { fieldName, helperText, ...otherProps } = props;
  return (
    <Field
      name={fieldName}
      render={({ meta, input }) => {
        return (
          <TextInput
            {...input}
            {...otherProps}
            helperText={meta.touched ? meta.error : helperText}
            error={meta.touched && meta.error}
          />
        );
      }}
    />
  );
};
