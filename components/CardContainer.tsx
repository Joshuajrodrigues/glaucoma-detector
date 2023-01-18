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


  return (
    <div className="relative w-full h-full p-5 ">
      <Card completedDeck={steps} index={0} />
      <Card completedDeck={steps} index={1} />
      <Card completedDeck={steps} index={2} />
      <Card completedDeck={steps} index={3} />
      <Card
        completedDeck={steps}
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
        <Button >Crop</Button>
      </Card>
      <Card
        completedDeck={steps}
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
