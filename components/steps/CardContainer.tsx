import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Card from "./Card";
import ImageContainer from "../ImageContainer";
import Button from "../Button";
import useFundas from "../../store/useFundas";
import useCropComplete from "../../store/useCropComplete";
import { useDebounceEffect } from "../../hooks/useDebounceEffect";
import { canvasPreview } from "../../utils/canvasPreview";

const CardContainer: FunctionComponent<{
  imageCallback: (images: File[]) => void;
}> = ({ imageCallback }) => {
  const image = useFundas((state) => state.image);
  const [fundas, setFundas] = useState<File[]>([]);
  const [completedDeck, setCompletedDeck] = useState<number[]>([]);
  const cropedImageStats = useCropComplete((state) => state.image);
  const updateFileCb = (filesArray: File[]) => {
    console.log("updateFileCb", filesArray);
    setFundas(filesArray);
    imageCallback(filesArray);
  };
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const handleNext = (index: number) => {
    console.log("handleNext", index);
    setCompletedDeck((prev) => [...prev, index]);
  };
  useEffect(() => {
    if (cropedImageStats?.width && cropedImageStats?.height){

      let img = new Image()
      img.src = URL.createObjectURL(image[0])
      img.onload =()=>{
          if (previewCanvasRef.current) {
          
          canvasPreview(img, previewCanvasRef.current, cropedImageStats);
        }
      }
    }
    

   
  }, [cropedImageStats]);

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
        <p>Place region of interest in the square.</p>
        <p>Once ready use the crop button</p>
        <canvas
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
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
