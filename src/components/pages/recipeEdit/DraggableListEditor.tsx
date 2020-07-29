import React from "react";
import { DraggableList } from "components/shared/DraggableList";
import { Button } from "components/shared/Button";
import { EditableListItemContent } from "./EditableListItemContent";

export interface DraggableListEditorProps {
  values?: string[];
  onChange: (values: string[]) => void;
  id: string;
}

export const DraggableListEditor: React.FC<DraggableListEditorProps> = (
  props
) => {
  const { values = [], onChange, id } = props;

  const handleAdd = () => {
    let newValues = [...values];
    newValues.push("");
    onChange(newValues);
  };

  const handleValueChange = (value: string, index: number) => {
    let newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  const handleValueDelete = (index: number) => {
    let newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  return (
    <>
      <DraggableList
        id={id}
        onChange={onChange}
        values={values}
        contentComponent={(value, index) => (
          <EditableListItemContent
            value={value}
            index={index}
            id={id}
            onChange={handleValueChange}
            handleDelete={handleValueDelete}
          />
        )}
      />
      <Button
        id={"add-" + id}
        variant={"outlined"}
        color={"primary"}
        containerClassName={"mt-1"}
        onClick={handleAdd}
      >
        Add
        <span className={"text-2xl leading-none ml-2"}>+</span>
      </Button>
    </>
  );
};
