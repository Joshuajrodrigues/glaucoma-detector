import React, { FunctionComponent, useState } from "react";
import Card from "./Card";
import ImageContainer from "../ImageContainer";
import Button from "../Button";

const CardContainer: FunctionComponent<{
  imageCallback: (images: File[]) => void;
}> = ({ imageCallback }) => {
  const [fundas, setFundas] = useState<File[]>([]);
  const [completedDeck, setCompletedDeck] = useState<number[]>([]);
  const updateFileCb = (filesArray: File[]) => {
    console.log("updateFileCb", filesArray);
    setFundas(filesArray);
    imageCallback(filesArray);
  };

  const handleNext = (index: number) => {
    console.log("handleNext", index);
    setCompletedDeck((prev) => [...prev, index]);
  };

  return (
    <div className="relative w-full h-full p-5 ">
      <Card completedDeck={completedDeck} handleNext={handleNext} index={0} />
      <Card completedDeck={completedDeck} handleNext={handleNext} index={1} />
      <Card completedDeck={completedDeck} handleNext={handleNext} index={2} />
      <Card completedDeck={completedDeck} handleNext={handleNext} index={3} />
      <Card
        completedDeck={completedDeck}
        handleNext={handleNext}
        title="Crop Roi"
        index={4}
      >
        <p>
          Place region of interest in the square.
        </p>
        <p>Once ready use the crop button</p>
        <Button>Crop</Button>
      </Card>
      <Card
        completedDeck={completedDeck}
        handleNext={handleNext}
        showNext={fundas.length > 0}
        title="Select Image"
        index={5}
      >
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
