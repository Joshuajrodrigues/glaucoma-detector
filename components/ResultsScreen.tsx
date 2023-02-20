import React, { useEffect, useState } from "react";
import Button from "./Button";
import useDisplayResult from "../store/useDisaplyResult";
import useCdrCalculations, { ICodinates } from "../store/useCdrCalculation";
import ReProcess from "./ReProcess";
import useSteps from "../store/useSteps";
import useFundas from "../store/useFundas"
import useSample from "../store/useSample";
import useProcessedData from "../store/useProcessedData";
const ResultsScreen = () => {
  const setImageToShow = useDisplayResult((S) => S.setImage);
  const setImages = useFundas((state) => state.setImage);
  const setLoadSample = useSample((s) => s.setImage);
  const diskImageData = useProcessedData((s) => s.diskImageData);
  const cupImageData = useProcessedData((s) => s.cupImageData);
  const imageShown = useDisplayResult((s) => s.imageToShow);
  const cupCal = useCdrCalculations((s) => s.cup);
  const diskCal = useCdrCalculations((s) => s.disk);
  const setSteps = useSteps((state) => state.setSteps);
  const [cupArea, setCupArea] = useState(0);
  const [diskArea, setDiskArea] = useState(0);
  const [isReprocessed, setIsReprocessed] = useState({
    cup: false,
    disk: false
  })
  useEffect(() => {
    if (cupCal) {
      let cA = Math.abs(onCupAreaChange(cupCal));
      setCupArea(cA);
    }
    if (diskCal) {
      let dA = Math.abs(onDiskAreaChange(diskCal));
      setDiskArea(dA);
    }
  }, [cupCal, diskCal]);

  const onCupAreaChange = (cupCal: ICodinates) => {
    return Number(
      (
        Math.PI *
        ((cupCal.x1 || 0) - (cupCal.x2 || 0)) *
        ((cupCal.y1 || 0) - (cupCal.y2 || 0))
      ).toFixed(2)
    );
  };

  const onDiskAreaChange = (diskCal: ICodinates) => {
    return Number(
      (
        Math.PI *
        ((diskCal.x1 || 0) - (diskCal.x2 || 0)) *
        ((diskCal.y1 || 0) - (diskCal.y2 || 0))
      ).toFixed(2)
    );
  };
  const handleReset=()=>{
    setSteps([])
    setImages([])
    setLoadSample(false)
  }
  return (
    <>
      <div className="flex">
        <Button onClick={() => setImageToShow("current")}>Original</Button>
        <Button onClick={() => setImageToShow("cup")}>Show Cup</Button>
        <Button onClick={() => setImageToShow("disk")}>Show Disk</Button>
      </div>
      <div className=" flex flex-col font-bold mt-7">
        <div>Cup Area :{cupArea} px</div>
        <div>Disk Area :{diskArea} px</div>
        <div>
          Estimated Cup To Disk Ratio (CDR) :
          {(isNaN(cupArea / diskArea) || diskArea === 0) ? "" : (cupArea / diskArea)?.toFixed(2)}
        </div>
        {(!isNaN(cupArea / diskArea )&& diskArea !== 0) && (
          <div>
            {cupArea / diskArea >= 0.5 ? (
              <span className=" text-green-600">
                Possible Glaucoma as CDR ratio &gt;= 0.5
              </span>
            ) : (
              <span className="text-orange-600">
                Negative Glaucoma as CDR ratio &lt;= 0.5
              </span>
            )}
          </div>
        )}
        {imageShown !== "current" && <ReProcess
          imageType={imageShown}
          imageData={imageShown === "cup" ? cupImageData : diskImageData}
          reprocessCb={(img) => setIsReprocessed((prev) => ({ ...prev, [img]: true }))}
          isReprocessed={imageShown === "cup" ? isReprocessed.cup : imageShown === "disk" ? isReprocessed.disk : false}
        />}
        <div className=" font-normal">
        <button className=" mt-5 underline text-blue-500 "  onClick={handleReset}>Upload new</button>
        </div>
      </div>
    </>
  );
};

export default ResultsScreen;
