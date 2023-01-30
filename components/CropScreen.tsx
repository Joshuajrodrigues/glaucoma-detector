import React, { FC, RefObject, useEffect } from "react";
import Button from "./Button";
import useCropComplete from "../store/useCropComplete";
import useSteps from "../store/useSteps";
import useFundas from "../store/useFundas";

const CropScreen: FC<{
  previewCanvasRef: RefObject<HTMLCanvasElement>;
}> = ({ previewCanvasRef }) => {

  const cropCompleteState = useCropComplete((state) => state);
  const stepState = useSteps(s => s)
  const fundasState = useFundas((state) => state);

  const handleCrop = () => {
    let newSteps = stepState.steps;
    newSteps.push(4);
    stepState.setSteps(newSteps);
    fundasState.setImage(cropCompleteState.croppedImage);
    cropCompleteState.setIsCropping(false);
  };
  useEffect(() => {
    console.log("cropCompleteState", cropCompleteState);

  }, [cropCompleteState])
  return (
    <>
      <p>Place region of interest in the square.</p>
      <p>Once ready use the crop button</p>
      <canvas
        ref={previewCanvasRef}
        style={{
          border: "1px solid black",
          objectFit: "contain",
          width: "320px",
          height: "180px",
          //orderRadius: "50%"
        }}
      />
      {cropCompleteState.cropImageProperties.width > 0 && (
        <Button
          onClick={() => {
            handleCrop();
          }}
        >
          Crop
        </Button>
      )}
    </>
  );
};

export default CropScreen;
