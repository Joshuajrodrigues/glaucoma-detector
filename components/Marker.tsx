import React, { FC, ReactNode, useEffect, useState } from "react";

type Direction = "verticle" | "horizontal";

const Marker: FC<{
  limit?: number;
  startPos?: number;
  direction?: Direction;

}> = ({
  limit,
  startPos = 0,
  direction = "horizontal",

}) => {
  const [square, setSquare] = useState(startPos);
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState(0);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const getClientPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    if (direction === "horizontal") {
      return event.clientX;
    } else {
      return event.clientY;
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStart(getClientPosition(event));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      requestAnimationFrame(() => {
        const clientPos = getClientPosition(event);
        const currentX = square + clientPos - start;
        let newLimitX = direction === "horizontal"? limit || 0 : (limit || 0)-32/2;
        let newLimitY = direction !== "horizontal" ? 32 / 2 : 0;

        if (currentX >= 0 - newLimitY && currentX <= newLimitX) {
          setSquare(square + clientPos - start);
          setStart(clientPos);
        }
      });
    }
  };

  return (
    <div
      style={{
        left: direction === "horizontal" ? square + "px" : "0px",
        top: direction === "verticle" ? square + "px" : "0px",
        zIndex: "111",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className={`${
        direction === "horizontal"
          ? "w-0 h-full justify-center"
          : "w-full h-0  align-middle"
      } flex   absolute ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${
        direction === "horizontal" ? "x-cursor" : "y-cursor"
      } `}
    >
   
      <span
        className={`${
          direction === "horizontal" ? "w-8 h-6 bg-blue-500" : "w-6 h-8 bg-red-500"
        }  absolute text-white  text-center `}
      >
      
      </span>
    </div>
  );
};

export default Marker;

