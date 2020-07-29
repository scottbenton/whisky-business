import React from "react";
import { Field } from "react-final-form";
import { DraggableListEditor } from "./DraggableListEditor";
import { InputLabel, HelperText } from "components/shared/TextInput";

export interface DraggableListFormFieldProps {
  name: string;
  label?: string;
}

export const DraggableListFormField: React.FC<DraggableListFormFieldProps> = (
  props
) => {
  const { name, label } = props;
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const { error, touched } = meta;
        const showError = error && touched;

        return (
          <>
            {label && (
              <InputLabel className={"mt-4"} error={showError}>
                {label}
              </InputLabel>
            )}
            <DraggableListEditor
              id={name}
              values={input.value || []}
              onChange={input.onChange}
            />
            {showError && <HelperText error={showError}>{error}</HelperText>}
          </>
        );
      }}
    </Field>
  );
};
