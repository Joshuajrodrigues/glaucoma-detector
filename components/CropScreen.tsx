import React, { FC, RefObject, useEffect } from "react";
import Button from "./Button";
import useCropComplete from "../store/useCropComplete";
import useSteps from "../store/useSteps";
import useFundas from "../store/useFundas";
import useSample from "../store/useSample";

const CropScreen: FC<{
  previewCanvasRef: RefObject<HTMLCanvasElement>;
}> = ({ previewCanvasRef }) => {
  const cropCompleteState = useCropComplete((state) => state);
  const stepState = useSteps((s) => s);
  const fundasState = useFundas((state) => state);
  const setLoadSample = useSample((s) => s.setImage);
  const handleCrop = () => {
    let newSteps = stepState.steps;
    newSteps.push(4);
    stepState.setSteps(newSteps);
    fundasState.setImage(cropCompleteState.croppedImage);
    cropCompleteState.setIsCropping(false);
  };
  useEffect(() => {
    console.log("cropCompleteState", cropCompleteState);
  }, [cropCompleteState]);
  const handleReset=()=>{
    stepState.setSteps([])
    fundasState.setImage([])
    setLoadSample(false)
  }
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
      <div className=" font-normal">
        <button className=" underline text-blue-500 "  onClick={handleReset}>Upload new</button>
      </div>
    </>
  );
};

export default CropScreen;
