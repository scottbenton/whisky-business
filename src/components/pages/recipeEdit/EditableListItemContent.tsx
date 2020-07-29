import React from "react";
import { TextInput } from "components/shared/TextInput";
import { Trash } from "react-zondicons";
import { InputAdornment } from "components/shared/TextInput/InputAdornment";

export interface EditableListItemContentProps {
  value: string;
  onChange: (value: string, index: number) => void;
  index: number;
  id: string;
  handleDelete: (index: number) => void;
}

export const EditableListItemContent: React.FC<EditableListItemContentProps> = (
  props
) => {
  const { value, onChange, index, id, handleDelete } = props;

  return (
    <div className={"px-4 w-full"}>
      <TextInput
        id={id + "-" + index}
        value={value}
        onChange={(evt) => onChange(evt.currentTarget.value, index)}
        endAdornment={
          <InputAdornment
            id={id + "-" + index + "delete"}
            onClick={() => handleDelete(index)}
          >
            <Trash />
          </InputAdornment>
        }
      />
    </div>
  );
};
