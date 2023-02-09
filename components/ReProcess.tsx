import React, { FC, useState } from "react";
import { ImageToShowType } from "../store/useDisaplyResult";
import Button from "./Button";
import fuzzy from "../utils/fuzzy";
import useProcessedData from "../store/useProcessedData";

const ReProcess: FC<{
  imageType: ImageToShowType;
}> = ({ imageType }) => {
  const diskImageData = useProcessedData((s) => s.diskImageData);
  const cupImageData = useProcessedData((s) => s.cupImageData);
  const setImageData = useProcessedData((s) => s.setImageData);

  const [isReprocessed,setIsReprocessed] = useState(false)
  const handleReprocess = () => {
    if (imageType==="disk" && diskImageData) {
      let cluster1 = new ImageData(
        fuzzy(diskImageData.data).cluster1,
        diskImageData.width,
        diskImageData.height
        );
        setImageData("diskImageData", cluster1);
      }
      if (imageType==="cup" && cupImageData) {
        let cluster1 = new ImageData(
          fuzzy(cupImageData.data).cluster1,
          cupImageData.width,
          cupImageData.height
          );
          setImageData("cupImageData", cluster1);
        }
        setIsReprocessed(true)
      };

  return (
    <div className=" font-normal">
     Not what youre looking for ? <button className=" font-bold underline " onClick={handleReprocess}>Reprocess {imageType}</button>
    {
      isReprocessed &&
      <div >
      <button className="underline m-2 p-1">
        Cluster 1
      </button>
      <button className="underline m-2 p-1">
        Cluster 2
      </button>
      </div>
    }
    </div>
  );
};

export default ReProcess;
