import React, { useState } from "react";
import Card from "./Card";
import ImageContainer from "../ImageContainer";

const CardContainer = () => {
  const [fundas, setFundas] = useState<File[]>([]);
  const imageCallback = (filesArray: File[]) => {
    console.log("imageCallback", filesArray);
    setFundas(filesArray);
  };
  return (
    <div className="relative w-full h-full p-5 ">
      <Card index={0} />
      <Card index={1} />
      <Card index={2} />
      <Card index={3} />
      <Card title="Crop Roi" index={4} />
      <Card title="Select Image" index={5}>
        <ImageContainer
          instructions="Drop Your Image Here OR"
          multiple={false}
          updateFileCb={imageCallback}
        />
      </Card>
    </div>
  );
};

export default CardContainer;
