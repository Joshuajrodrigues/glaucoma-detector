import {
  FunctionComponent, RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import useCropComplete from "../store/useCropComplete";
import useFundas from "../store/useFundas";
import useSteps from "../store/useSteps";
import { canvasPreview } from "../utils/canvasPreview";
import Button from "./Button";
import Card from "./Card";

const CardContainer: FunctionComponent<{
  imageRef: RefObject<HTMLImageElement>
}> = ({ imageRef }) => {



  const cropedImageStats = useCropComplete((state) => state.image);
  const { setSteps, steps } = useSteps((state) => state)

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (
      cropedImageStats?.width &&
      cropedImageStats?.height &&
      previewCanvasRef.current && imageRef &&
      imageRef.current
    ) {
      canvasPreview(
        imageRef.current,
        previewCanvasRef.current,
        cropedImageStats
      ).then((resp) => {
        let fileObject: File
        resp.toBlob((blob) => {
          if (blob) {
            fileObject = new File([blob], "blsa", { type: "image/jpg" });
            console.log("fileObject", fileObject);
          //  setImage([fileObject])
          }
        })

      })
    }
  }, [cropedImageStats]);

  const handleCrop = () => {
    console.log("i run", steps)
    let newSteps = steps
    newSteps.push(4)
    setSteps(newSteps)
  }
  return (
    <div className="relative w-full h-full p-5 ">
      <Card isVisible={!steps.includes(0)} index={0} />
      <Card isVisible={!steps.includes(1)} index={1} />
      <Card isVisible={!steps.includes(2)} index={2} />
      <Card isVisible={!steps.includes(3)} index={3} />
      <Card
        isVisible={!steps.includes(4)}
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
        <Button onClick={() => { handleCrop() }} >Crop</Button>
      </Card>
      <Card
        isVisible={!steps.includes(5)}
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
