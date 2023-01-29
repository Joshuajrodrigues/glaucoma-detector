import { FunctionComponent, RefObject, useEffect, useRef } from "react";
import useCropComplete from "../store/useCropComplete";
import useDisplayResult from "../store/useDisaplyResult";
import useFundas from "../store/useFundas";
import useSample from "../store/useSample";
import useSteps from "../store/useSteps";
import { canvasPreview } from "../utils/canvasPreview";
import Button from "./Button";
import Card from "./Card";
import useCdrCalculations from "../store/useCdrCalculation";

const CardContainer: FunctionComponent<{
  imageRef: RefObject<HTMLImageElement>;
}> = ({ imageRef }) => {
  const { cropImageProperties, setCroppedImage, croppedImage } =
    useCropComplete((state) => state);
  const { setImage } = useFundas((state) => state);
  const { setSteps, steps } = useSteps((state) => state);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const setIsCropping = useCropComplete((state) => state.setIsCropping);
  const setImageToShow = useDisplayResult((S) => S.setImage);
  const setLoadSample = useSample((s) => s.setImage);
  const cupCal = useCdrCalculations((s) => s.cup);
  const diskCal = useCdrCalculations((s) => s.disk);
  useEffect(() => {
    if (
      cropImageProperties?.width &&
      cropImageProperties?.height &&
      previewCanvasRef.current &&
      imageRef &&
      imageRef.current
    ) {
      canvasPreview(
        imageRef.current,
        previewCanvasRef.current,
        cropImageProperties
      ).then((resp) => {
        let fileObject: File;
        resp.toBlob((blob) => {
          if (blob) {
            fileObject = new File([blob], "blsa", { type: "image/jpg" });
            console.log("fileObject", fileObject);
            setCroppedImage([fileObject]);
            //  setImage([fileObject])
          }
        });
      });
    }
  }, [cropImageProperties]);

  const handleCrop = () => {
    console.log("i run", steps);
    let newSteps = steps;
    newSteps.push(4);
    setSteps(newSteps);
    setImage(croppedImage);
    setIsCropping(false);
  };

  const loadSample = () => {
    setLoadSample(true);
  };

  return (
    <div className="relative md:w-1/2 w-full h-full p-5 ">
      <Card isVisible={!steps.includes(3)} index={3}>
        <pre>{JSON.stringify(cupCal, null, 2)}</pre>
        <div className="flex">
          <Button onClick={() => setImageToShow("cup")}>Show Cup</Button>
          <Button onClick={() => setImageToShow("disk")}>Show Disk</Button>
          <Button onClick={() => setImageToShow("current")}>
            Show Original
          </Button>
        </div>
        <div className=" flex flex-col font-bold mt-14">
          <div>
            Cup Area :{" "}
            {Math.PI *
              ((cupCal.x1 || 0) - (cupCal.x2 || 0)) *
              ((cupCal.y1 || 0) - (cupCal.y2 || 0))}
          </div>
          <div>
            Disk Area :
            {Math.PI *
              ((diskCal.x1 || 0) - (diskCal.x2 || 0)) *
              ((diskCal.y1 || 0) - (diskCal.y2 || 0))}
          </div>
          <div>
            Estimated Cup To Disk Ratio (CDR) :
            {(Math.PI *
              ((cupCal.x1 || 0) - (cupCal.x2 || 0)) *
              ((cupCal.y1 || 0) - (cupCal.y2 || 0))) /
              (Math.PI *
                ((diskCal.x1 || 0) - (diskCal.x2 || 0)) *
                ((diskCal.y1 || 0) - (diskCal.y2 || 0)))}
          </div>
        </div>
      </Card>
      <Card isVisible={!steps.includes(4)} title="Crop Roi" index={4}>
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
      </Card>
      <Card isVisible={!steps.includes(5)} title="Select Image" index={5}>
        <div className="flex flex-col justify-center items-center h-full">
          <p>
            Upload your own fundas eye image or use one of our samples here.
          </p>
          <div className="mt-7">
            <Button onClick={loadSample}>Load Sample Fundas</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardContainer;
