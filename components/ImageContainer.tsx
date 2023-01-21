import React, { FunctionComponent, LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import Button from "./Button";
import useFundas from "../store/useFundas";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import useCropComplete from "../store/useCropComplete";
import useSteps from "../store/useSteps";
const MAX_SIZE = 16270840;
type Files = { [key: string]: File };

const ImageContainer: FunctionComponent<{
  accept?: string[];
  instructions?: string;
  label?: string;
  imageRef?:RefObject<HTMLImageElement>
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Files>({});
  const images = useFundas((state) => state.image);
  const setImages = useFundas((state) => state.setImage);
  const [crop, setCrop] = useState<Crop>();
  const setCropInfo = useCropComplete((state) => state.setCropImageProperties)
  const isCropping = useCropComplete((state) => state.isCropping)
  const setIsCropping = useCropComplete((state) => state.setIsCropping)
  const { setSteps } = useSteps((state) => state)
  const handleUploadBtnClick = () => {
    fileInputRef.current?.click();
  };

  const convertNestedObjectToArray = (nestedObj: Files): File[] => {
    return Object.keys(nestedObj).map((key) => nestedObj[key]);
  };

  useEffect(() => {
    if (!isCropping) {
      setCrop({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        unit: "px"
      })
    }
  }, [isCropping])
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
    setSteps([5])
    setIsCropping(true)

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

  return (
    <section>
      <div
        className={
          "flex justify-center items-center md:w-full lg:w-1/2 h-80 p-5 m-5 border-black rounded outline-dashed "
        }
      >
        <div className=" w-full h-full relative flex flex-col items-center ">
          <p className="p-5 m-5 w-56 rounded">{instructions}</p>
          {/* Upload image */}
          {Object.keys(files).length === 0 && (
            <>
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
                {isImageFile && (
                  <ReactCrop
                    circularCrop
                    crop={crop}
                    disabled={!isCropping}
                    style={{"width":"100%","height":"100%"}}
                    onChange={(c) => setCrop(c)}

                    onComplete={(c) => setCropInfo(c)}
                    //className="w-full h-full object-cover"
                  >
                    <img
                    ref={imageRef}
                      className={`w-full h-full `}
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  </ReactCrop>
                )}
                  
              </section>
            );
          })}

          
            {/* <canvas className=" bg-slate-500 w-full h-full"  id="image-editor">
          
            </canvas>
           */}
        </div>
      </div>
    </section>
  );
};

export default ImageContainer;
