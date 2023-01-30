import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "react-image-crop/dist/ReactCrop.css";
import useCropComplete from "../store/useCropComplete";
import useDisplayResult from "../store/useDisaplyResult";
import useFundas from "../store/useFundas";
import useProcessedData from "../store/useProcessedData";
import useSample from "../store/useSample";
import useSteps from "../store/useSteps";
import { canvasPreprocess } from "../utils/canvasPreprocessing";
import fuzzy from "../utils/fuzzy";
import { getImageCodinates } from "../utils/imageCodinates";
import Button from "./Button";
import Cropper from "./Cropper";
import ProcessingCanvas from "./ProcessingCanvas";
const MAX_SIZE = 16270840;
type Files = { [key: string]: File };

const ImageContainer: FunctionComponent<{
  accept?: string[];
  instructions?: string;
  label?: string;
  imageRef?: RefObject<HTMLImageElement>;
  maxFileSize?: number;
  multiple?: boolean;
}> = ({
  label,
  imageRef,
  instructions,
  maxFileSize = MAX_SIZE,
  multiple = false,
  accept = [".jpg", ".png"],
}) => {
  const preprocessCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Files>({});
  const images = useFundas((state) => state.image);
  const setImages = useFundas((state) => state.setImage);
  const setIsCropping = useCropComplete((state) => state.setIsCropping);
  const setSteps = useSteps((state) => state.setSteps);
  const steps = useSteps((state) => state.steps);
  const imageToShow = useDisplayResult((s) => s.imageToShow);
  const setImageData = useProcessedData((s) => s.setImageData);
  const cupImageData = useProcessedData((s) => s.cupImageData);
  const diskImageData = useProcessedData((s) => s.diskImageData);
  const imageData = useProcessedData((s) => s.imageData);
  const loadSample = useSample((s) => s.load);
  const handleUploadBtnClick = () => {
    fileInputRef.current?.click();
  };

  const convertNestedObjectToArray = (nestedObj: Files): File[] => {
    return Object.keys(nestedObj).map((key) => nestedObj[key]);
  };

  useEffect(() => {
    if (images[0]) {
      console.log("i run")
      let img = new Image();
      img.src = URL.createObjectURL(images[0]);
      img.onload = function () {
        if (steps.includes(4) && preprocessCanvasRef.current) {
          canvasPreprocess(img, preprocessCanvasRef.current).then(
            (imageData) => {
              let cup = new ImageData(
                fuzzy(imageData.data).cluster1,
                imageData.width,
                imageData.height
              );

                let disk = new ImageData(
                  fuzzy(imageData.data).cluster2,
                  imageData.width,
                  imageData.height
                );
                setImageData("imageData", img);
                setImageData("cupImageData", cup);
                setImageData("diskImageData", disk);
              }
            );
          }
        };
      }
    }, [steps, images, preprocessCanvasRef]);

  useEffect(() => {
    if (imageToShow === "cup") {
      let ctx = preprocessCanvasRef.current?.getContext("2d");
      if (cupImageData) {
        getImageCodinates(preprocessCanvasRef.current, cupImageData.data)
        ctx?.putImageData(cupImageData, 0, 0);
      }
    } else if (imageToShow === "disk") {
      let ctx = preprocessCanvasRef.current?.getContext("2d");
      if (diskImageData) ctx?.putImageData(diskImageData, 0, 0);
    } else if (imageToShow === "current") {
      if (imageData && preprocessCanvasRef.current)
        canvasPreprocess(imageData, preprocessCanvasRef?.current);
    }
  }, [imageToShow, imageData, diskImageData]);

  const addNewFiles = (newFiles: FileList) => {
    for (let file of newFiles) {
      if (file.size < maxFileSize) {
        if (!multiple) {
          return { [file.name]: file };
        }

          files[file.name] = file;
        }
      }
      return { ...files };
    };

  const callUpdateFilesCb = (filesObj: Files) => {
    let filesArr = convertNestedObjectToArray(filesObj);
    setImages(filesArr);
    setSteps([5]);
    setIsCropping(true);
  };

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;

      if (newFiles?.length) {
        let updatedFiles = addNewFiles(newFiles);
        console.log("updatedFiles", updatedFiles);
        setFiles(updatedFiles);
        callUpdateFilesCb(updatedFiles);
      }
    };

  useEffect(() => {
    if (loadSample) {
      fetch("/samples/160.jpg").then(async (resp) => {
        console.log(resp);
        let data = await resp.blob();
        let metadata = {
          type: "image/jpeg",
        };
        let file = new File([data], "test.jpg", metadata);
        setImages([file]);
        setSteps([5]);
        setIsCropping(true);
      });
    }
  }, [loadSample]);
  return (
    <section className="md:w-1/2">
      <div
        className={`flex 
        bg-white 
        justify-center 
        items-center 
        h-96 md:w-96 
        lg:w-5/6 
        md:h-96 
        md:ml-7 
        p-5 m-9
         border-black 
         rounded 
         outline-dashed
       `}
        >
          <div className=" w-full h-full relative flex flex-col items-center ">
            {/* Upload image */}
            {Object.keys(files).length === 0 &&
              images.length <= 0 &&
              !loadSample && (
                <>
                  <p className="p-5 m-5 w-56 rounded">{instructions}</p>
                  <label>{label}</label>
                  <Button onClick={handleUploadBtnClick}>Upload File</Button>
                  <input
                    className="w-full h-full border-none absolute top-0 bottom-0 left-0 right-0 opacity-0 "
                    type={"file"}
                    draggable
                    multiple={multiple}
                    title={""}
                    value={""}
                    onChange={handleNewFileUpload}
                    ref={fileInputRef}
                  />
                </>
              )}

            {/* Display image */}
            {Object.keys(images).map((fileName, index) => {
              let file = images[index];
              let isImageFile = file.type.split("/")[0] === "image";

              return (
                <section
                  className="w-full h-full border-none absolute top-0 bottom-0 left-0 right-0 "
                  key={fileName}
                >
                  {isImageFile && !steps.includes(4) ? (
                    <>
                      <Cropper file={file} imageRef={imageRef} />
                    </>
                  ) : (
                    <>
                      <ProcessingCanvas
                        preprocessCanvasRef={preprocessCanvasRef}
                      />
                    </>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

export default ImageContainer;
