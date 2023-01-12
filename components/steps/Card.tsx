import React, { FunctionComponent, ReactNode } from "react";
import Button from "../Button";

const Card: FunctionComponent<{
  showNext?: boolean;
  title?: string;
  index: number;
  children?: ReactNode;
}> = ({ index, children, title, showNext }) => {
  return (
    <div
      className={`flex flex-col items-center absolute bg-white h-96 top-${index} border p-5 m-5 rounded-t-lg border-black left-0 right-0 bottom-0`}
    >
      {!showNext ? (
        <>
          <h2>{title}</h2>
          {children}
        </>
      ) : (
        <Button>Next</Button>
      )}
    </div>
  );
};

export default Card;
