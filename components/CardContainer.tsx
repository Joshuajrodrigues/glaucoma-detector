import {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import useCropComplete from "../store/useCropComplete";
import useSample from "../store/useSample";
import { canvasPreview } from "../utils/canvasPreview";
import Button from "./Button";
import Card from "./Card";
import CropScreen from "./CropScreen";
import ResultsScreen from "./ResultsScreen";
import useSteps from "../store/useSteps";
import SelectScreen from "./SelectScreen";

const CardContainer: FunctionComponent<{
  imageRef: RefObject<HTMLImageElement>;
}> = ({ imageRef }) => {

  const cropCompleteState = useCropComplete((state) => state);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      cropCompleteState.cropImageProperties?.width &&
      cropCompleteState.cropImageProperties?.height &&
      previewCanvasRef.current &&
      imageRef &&
      imageRef.current
    ) {
      canvasPreview(
        imageRef.current,
        previewCanvasRef.current,
        cropCompleteState.cropImageProperties
      ).then((resp) => {
        let fileObject: File;
        resp.toBlob((blob) => {
          if (blob) {
            fileObject = new File([blob], "blsa", { type: "image/jpg" });
            console.log("fileObject", fileObject);
            cropCompleteState.setCroppedImage([fileObject]);
            //  setImage([fileObject])
          }
        });
      });
    }
  }, [cropCompleteState.cropImageProperties]);

  return (
    <div className="relative md:w-1/2 w-full h-full p-5 ">
      <Card index={3}>
        <ResultsScreen />
      </Card>
      <Card title="Crop Roi" index={4}>
        <CropScreen previewCanvasRef={previewCanvasRef} />
      </Card>
      <Card title="Select Image" index={5}>
        <SelectScreen />
      </Card>
    </div>
  );
};

export default CardContainer;
