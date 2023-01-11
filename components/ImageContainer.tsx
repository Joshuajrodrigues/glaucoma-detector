import React, { FunctionComponent, useRef, useState } from "react";
import Button from "./Button";

const MAX_SIZE = 16270840;
type FileType = { _ :File}
interface IFiles{
  "file.jpg":File,
  "file2.jpg":File
}  
const ImageContainer: FunctionComponent<{
  accept?: string[];
  label?: string;
  maxFileSize?: number;
  updateFileCb: () => void;
  multiple?: boolean;
}> = ({
  label,
  maxFileSize = MAX_SIZE,
  updateFileCb,
  multiple = false,
  accept = [".jpg", ".png"],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<IFiles | {}>({});
  const handleUploadBtnClick = () => {
    fileInputRef.current?.click();
  };

  const addNewFiles = (newFiles: FileList) => {
    for (let file of newFiles) {
      if (file.size < maxFileSize) {
        if (!multiple) {
          console.log("newFiles",{file});
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;

    if (newFiles?.length) {
      let updatedFiles = addNewFiles(newFiles);
      console.log("updatedFiles",updatedFiles);
      setFiles(updatedFiles);
      //callUpdateFilesCb(updatedFiles);
    }
  };
  return (
    <section>
      
      <label>{JSON.stringify(files,null,2)}</label>
      <div
        className={
          "flex justify-center items-center md:w-full lg:w-1/2 h-80 p-5 m-5 border-black rounded outline-dashed "
        }
      >
        <div className=" flex flex-col  items-center">
          <p className="p-5 m-5 w-56 rounded">
            Drag and drop your file/s anywhere or
          </p>

          <Button onClick={handleUploadBtnClick}>Upload</Button>

          <input
            className="p-5 m-5 w-56 rounded"
            type={"file"}
            title={""}
            value={""}
            onChange={handleNewFileUpload}
            ref={fileInputRef}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageContainer;
