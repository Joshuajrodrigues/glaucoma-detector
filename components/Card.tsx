import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import Button from "./Button";

const Card: FunctionComponent<{
  showNext?: boolean;
  title?: string;
  handleNext: (index: number) => void;
  index: number;
  completedDeck: number[];
  children?: ReactNode;
}> = ({ index, children, title, showNext, handleNext, completedDeck }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (completedDeck.includes(index)) setIsVisible(false);
  }, [completedDeck, index]);
  return (
    <div
      className={`flex flex-col items-center absolute bg-white h-96 ${index === 0
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
      ${!isVisible && "hidden"}
      `}
    >
      <h2>{title}</h2>
      {!showNext ? (
        <>{children}</>
      ) : (
        <Button onClick={() => handleNext(index)}>Next</Button>
      )}
    </div>
  );
};

export default Card;
