import React, { FunctionComponent, ReactNode } from "react";

const Card:FunctionComponent<{
    title?:string
    index:number
    children?:ReactNode
}> = ({index,children,title}) => {
  return (
    <div className={`absolute bg-white h-96 top-${index} border p-5 m-5  rounded-t-lg border-black left-0 right-0 bottom-0`}>
     <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
