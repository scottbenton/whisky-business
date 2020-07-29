import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { DraggableListItem } from "./DraggableListItem";

export interface DraggableListProps {
  values: string[];
  onChange: (values: string[]) => void;
  id: string;
  contentComponent?: (value: string, index: number) => React.ReactNode;
}

export const DraggableList: React.FC<DraggableListProps> = (props) => {
  const { values, onChange, id, contentComponent } = props;

  const handleDrop = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const source = result.source.index;
    const destination = result.destination.index;

    const newValues = [...values];

    const [draggedValue] = newValues.splice(source, 1);
    newValues.splice(destination, 0, draggedValue);

    onChange(newValues);
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId={id + "-droppable"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {values.map((value, index) => (
              <DraggableListItem
                key={index}
                draggableId={index + ""}
                index={index}
                content={
                  contentComponent ? contentComponent(value, index) : value
                }
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
