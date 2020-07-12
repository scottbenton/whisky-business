import React from "react";
import { RecipeListItemType } from "../recipeListTypes";
import { Card } from "components/shared/Card";
import { Photo, Timer, ArrowThinRight } from "react-zondicons";
import { formatCookTime } from "utils/timeHelpers";
import { createId } from "utils/idHelpers";

export interface RecipeListItemProps extends RecipeListItemType {
  onClick: (id: string) => void;
}

export const RecipeListItem: React.FC<RecipeListItemProps> = (props) => {
  const { name, description, imageUrl, time, onClick, id } = props;

  return (
    <Card
      className={
        "flex justify-center cursor-pointer my-4 transform hover:shadow-lg hover:-translate-y-1 sm:hover:scale-105 focus:shadow-outline focus:scale-100 focus:shadow-outline outline-none transition-all ease-in-out duration-300"
      }
      component={"a"}
      tabIndex={0}
      onClick={() => onClick(id)}
      data-testid={createId(name, "link")}
    >
      <div className={"w-1/3"}>
        <div className={"bg-gray-500 w-full pb-full relative"}>
          {imageUrl ? (
            <img
              data-testid={createId("final product", "image")}
              src={imageUrl}
              alt={""}
              className={"absolute h-full w-full object-cover"}
            />
          ) : (
            <div
              className={
                "absolute h-full w-full flex justify-center items-center"
              }
            >
              <Photo
                data-testid={createId("no image provided", "svg")}
                className={"fill-current text-white"}
                size={35}
              />
            </div>
          )}
        </div>
      </div>
      <div className={"w-2/3 px-4 min-h-full max-h-full py-2 flex flex-col"}>
        <div className={"flex-grow"}>
          <span className={"text-2xl font-semibold"}>{name}</span>
          <p className={"overflow-hidden hidden sm:block"}>{description}</p>
        </div>
        <div className={"flex justify-between"}>
          <div className={"flex items-center"}>
            {time && (
              <>
                <Timer className={"text-gray-700 fill-current"} />
                <span className={"ml-2 text-lg"}>{formatCookTime(time)}</span>
              </>
            )}
          </div>
          <ArrowThinRight className={"text-gray-700 fill-current"} />
        </div>
      </div>
    </Card>
  );
};
