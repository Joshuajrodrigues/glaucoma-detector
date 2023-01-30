import React, { FC, RefObject, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import useCropComplete from "../store/useCropComplete";

const Cropper:FC<{
  imageRef?: RefObject<HTMLImageElement>,
  file: File
}> = ({imageRef,file}) => {
  const cropCompleteState = useCropComplete((state) => state.setCropImageProperties);
  const isCropping = useCropComplete((state) => state.isCropping);
    const [crop, setCrop] = useState<Crop>();
  return (
    <>
      <ReactCrop
        circularCrop
        crop={crop}
        disabled={!isCropping}
        style={{ width: "100%", height: "100%" }}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => cropCompleteState(c)}
        //className="w-full h-full object-cover"
      >
        <img
          ref={imageRef}
          className={`w-full h-full  `}
          src={URL.createObjectURL(file)}
          alt={`file preview `}
        />
      </ReactCrop>
    </>
  );
};

export default Cropper;
