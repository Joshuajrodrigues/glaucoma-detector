import React, { FunctionComponent, useRef, useState } from "react";
import Button from "./Button";

const MAX_SIZE = 16270840;
type Files = { [key: string]: File }
const ImageContainer: FunctionComponent<{
  accept?: string[];
  instructions?: string;
  label?: string;
  maxFileSize?: number;
  updateFileCb: (files: File[]) => void;
  multiple?: boolean;
}> = ({
  label,
  instructions,
  maxFileSize = MAX_SIZE,
  updateFileCb,
  multiple = false,
  accept = [".jpg", ".png"],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Files>({});
  const handleUploadBtnClick = () => {
    fileInputRef.current?.click();
  };
  const convertNestedObjectToArray = (nestedObj: Files) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

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
    let filesArr = convertNestedObjectToArray(filesObj)
    updateFileCb(filesArr)
  }

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

      <label>{label}</label>
      <div
        className={
          "flex justify-center items-center md:w-full lg:w-1/2 h-80 p-5 m-5 border-black rounded outline-dashed "
        }
      >
        <div className=" w-full h-full relative flex flex-col items-center ">
          <p className="p-5 m-5 w-56 rounded">
            {instructions}
          </p>

          <Button onClick={handleUploadBtnClick}>Upload File</Button>
          {
            Object.keys(files).length <= 0 &&
          <input
              className=" w-full h-full border-none absolute top-0 bottom-0 left-0 right-0 opacity-0 "
            type={"file"}
              draggable
              multiple={multiple}
            title={""}
            value={""}
            onChange={handleNewFileUpload}
            ref={fileInputRef}
          />
          }
          {
            Object.keys(files).map((fileName, index) => {
              let file = files[fileName]
              let isImageFile = file.type.split("/")[0] === "image";

              return (
                <section className=" w-full h-full border-none absolute top-0 bottom-0 left-0 right-0 " key={fileName}>
                  <div>
                    {
                      isImageFile && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`file preview ${index}`}
                        />
                      )
                    }
                  </div>
                </section>
              )
            })
          }
          </div>
        </div>
      </section>
    );
  };

export default ImageContainer;
