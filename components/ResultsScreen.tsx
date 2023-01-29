import React, { useEffect, useState } from "react";
import Button from "./Button";
import useDisplayResult from "../store/useDisaplyResult";
import useCdrCalculations, { ICodinates } from "../store/useCdrCalculation";

const ResultsScreen = () => {
  const setImageToShow = useDisplayResult((S) => S.setImage);
  const cupCal = useCdrCalculations((s) => s.cup);
  const diskCal = useCdrCalculations((s) => s.disk);
  const [cupArea, setCupArea] = useState(0);
  const [diskArea, setDiskArea] = useState(0);
  useEffect(() => {
    if (cupCal) {
      let cA = Math.abs(onCupAreaChange(cupCal));
      setCupArea(cA);
    }
    if (diskCal) {
      let dA = Math.abs(onDiskAreaChange(diskCal));
      setDiskArea(dA)
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
  return (
    <>
      <div className="flex">
        <Button onClick={() => setImageToShow("cup")}>Show Cup</Button>
        <Button onClick={() => setImageToShow("disk")}>Show Disk</Button>
        <Button onClick={() => setImageToShow("current")}>Show Original</Button>
      </div>
      <div className=" flex flex-col font-bold mt-14">
        <div>
          Cup Area :{cupArea} px
          
        </div>
        <div>
          Disk Area :{diskArea} px
        </div>
        <div>
          Estimated Cup To Disk Ratio (CDR) :
          {(cupArea/diskArea)?.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default ResultsScreen;
