import React from "react";
import { Field } from "react-final-form";
import { TextArea, TextAreaProps } from "./TextArea";

export interface TextAreaFormFieldProps extends TextAreaProps {
  fieldName: string;
}

export const TextAreaFormField: React.FC<TextAreaFormFieldProps> = (props) => {
  const { fieldName, helperText, ...otherProps } = props;
  return (
    <Field
      name={fieldName}
      render={({ meta, input }) => {
        return (
          <TextArea
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
