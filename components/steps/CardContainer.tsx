import React from "react";
import Card from "./Card";

const CardContainer = () => {
  return (
    <div className="relative w-full h-full p-5 ">
      <Card index={0} />
      <Card index={1} />
      <Card index={2} />
      <Card index={3} />
      <Card title="Crop Roi" index={4} />
      <Card title="Select Image" index={5} />
    </div>
  );
};

export default CardContainer;
