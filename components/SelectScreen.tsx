import React from "react";
import Button from "./Button";
import useSample from "../store/useSample";

const SelectScreen = () => {
  const setLoadSample = useSample((s) => s.setImage);

  const loadSample = () => {
    setLoadSample(true);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <p>Upload your own fundas eye image or use one of our samples here.</p>
        <div className="mt-7">
          <Button onClick={loadSample}>Load Sample Fundas</Button>
        </div>
      </div>
    </>
  );
};

export default SelectScreen;
