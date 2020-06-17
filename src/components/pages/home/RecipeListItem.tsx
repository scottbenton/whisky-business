import React from "react";
import { RecipeListItemType } from "./recipeListTypes";
import { Card } from "components/shared/Card";
import { Photo, Timer, ArrowThinRight } from "react-zondicons";
import { formatCookTime } from "utils/timeHelpers";

interface RecipeListItemProps extends RecipeListItemType {}

export const RecipeListItem: React.FC<RecipeListItemProps> = (props) => {
  const { name, description, imageUrl, time } = props;

  return (
    <Card
      className={
        "flex justify-center cursor-pointer my-4 transform transition-transform transition-shadow transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 sm:hover:scale-105"
      }
    >
      <div className={"w-1/3"}>
        <div className={"bg-gray-500 w-full pb-full relative"}>
          {imageUrl ? (
            <img
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
              <Photo className={"fill-current text-white"} size={35} />
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
