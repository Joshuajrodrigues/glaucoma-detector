import React, { useState } from "react";
import Button from "./Button";

const ImageContainer = () => {
  const [files, setFiles] = useState({});
  return (
    <div
      className={
        "flex justify-center items-center md:w-full lg:w-1/2 h-80 p-5 m-5 border-black rounded outline-dashed "
      }
    >
      <div className=" flex flex-col  items-center">
        <Button>Upload Image</Button>
        <Button>Load Example Image</Button>
      </div>
    </div>
  );
};

export default ImageContainer;
