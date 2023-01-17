import {
  FunctionComponent, RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import useCropComplete from "../store/useCropComplete";
import useFundas from "../store/useFundas";
import { canvasPreview } from "../utils/canvasPreview";
import Button from "./Button";
import Card from "./Card";

const CardContainer: FunctionComponent<{
  imageCallback: (images: File[]) => void;
  imageRef: RefObject<HTMLImageElement>
}> = ({ imageCallback, imageRef }) => {
  const image = useFundas((state) => state.image);
  const setImage = useFundas((state) => state.setImage)
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
  const handleCrop = () => {

  }
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
            setImage([fileObject])
          }
        })

      })
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
        <Button onClick={handleCrop}>Crop</Button>
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
