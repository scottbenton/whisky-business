import React from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";
import { DotsHorizontalTriple } from "react-zondicons";
import clsx from "clsx";

export interface DraggableListItemProps extends Partial<DraggableProps> {
  draggableId: string;
  index: number;
  content: React.ReactNode;
}

export const DraggableListItem: React.FC<DraggableListItemProps> = (props) => {
  const { content, ...draggableProps } = props;

  return (
    <Draggable {...draggableProps}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={"py-2"}
        >
          <div
            className={clsx(
              "flex bg-white rounded-lg overflow-hidden ",
              snapshot.isDragging ? "shadow-lg" : "shadow-md"
            )}
          >
            <div
              className={" bg-gray-400 flex items-center px-2"}
              {...provided.dragHandleProps}
            >
              <DotsHorizontalTriple />
            </div>
            {content}
          </div>
        </div>
      )}
    </Draggable>
  );
};
