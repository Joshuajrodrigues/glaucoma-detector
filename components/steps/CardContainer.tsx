import React, { FunctionComponent, useState } from "react";
import Card from "./Card";
import ImageContainer from "../ImageContainer";

const CardContainer:FunctionComponent<{
    imageCallback:(images:File[])=>void
}> = ({imageCallback}) => {
  const [fundas, setFundas] = useState<File[]>([]);

  const updateFileCb = (filesArray: File[]) => {
    console.log("updateFileCb", filesArray);
    setFundas(filesArray);
    imageCallback(filesArray)
  };
  return (
    <div className="relative w-full h-full p-5 ">
      <Card index={0} />
      <Card index={1} />
      <Card index={2} />
      <Card index={3} />
      <Card title="Crop Roi" index={4} />
      <Card showNext={fundas.length>0} title="Select Image" index={5}>
        <ImageContainer
          instructions="Drop Your Image Here OR"
          multiple={false}
          updateFileCb={updateFileCb}
        />
      </Card>
    </div>
  );
};

export default CardContainer;
