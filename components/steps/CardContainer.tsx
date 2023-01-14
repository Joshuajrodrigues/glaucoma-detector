import React, { FunctionComponent, useState } from "react";
import Card from "./Card";
import ImageContainer from "../ImageContainer";
import Button from "../Button";
import useFundas from "../../store/useFundas";

const CardContainer: FunctionComponent<{
  imageCallback: (images: File[]) => void;
}> = ({ imageCallback }) => {
  const image = useFundas((state)=>state.image)
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
        showNext={image.length > 0}
        title="Select Image"
        index={5}
      >
        <>
        <p>
          Upload your own fundas eye image or use one of our samples here.
        </p>
        <Button>Load Sample Fundas</Button>
        </>
      </Card>
    </div>
  );
};

export default CardContainer;
