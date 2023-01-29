import React, { FC, RefObject } from "react";
import Button from "./Button";
import useCropComplete from "../store/useCropComplete";
import useSteps from "../store/useSteps";
import useFundas from "../store/useFundas";

const CropScreen: FC<{
  previewCanvasRef:  RefObject<HTMLCanvasElement>;
}> = ({ previewCanvasRef }) => {
  const { cropImageProperties, setCroppedImage, croppedImage } =
    useCropComplete((state) => state);
  const { setSteps, steps } = useSteps((state) => state);
  const { setImage } = useFundas((state) => state);
  const setIsCropping = useCropComplete((state) => state.setIsCropping);
  const handleCrop = () => {
    let newSteps = steps;
    newSteps.push(4);
    setSteps(newSteps);
    setImage(croppedImage);
    setIsCropping(false);
  };
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
      {cropImageProperties.width > 0 && (
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
