import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useSteps from "../store/useSteps";
import Button from "./Button";

const Card: FunctionComponent<{
  title?: string;
  index: number;
  children?: ReactNode;
}> = ({ index, children, title }) => {
  const stepStore = useSteps((state) => state);

  return (
    <div
      className={`flex flex-col items-center absolute bg-white h-96 ${
        index === 0
          ? "top-0"
          : index === 1
          ? "top-1"
          : index === 2
          ? "top-2"
          : index === 3
          ? "top-3"
          : index === 4
          ? "top-4"
          : "top-5"
      } border p-5 m-5 rounded-t-lg border-black left-0 right-0 bottom-0
      ${stepStore.steps.includes(index) && "hidden"}`}
    >
      <h2>{title}</h2>

      <>{children}</>
    </div>
  );
};

export default Card;
