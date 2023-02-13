import React, { FC, useEffect, useState } from "react";
import { ImageToShowType } from "../store/useDisaplyResult";
import Button from "./Button";
import fuzzy from "../utils/fuzzy";
import useProcessedData from "../store/useProcessedData";
import ClusterSelector from "./ClusterSelector";

type ISelectedCluster =
    "original" |
    "cluster1" |
    "cluster2" |
    "cluster3"



const ReProcess: FC<{
    imageType: ImageToShowType;
    imageData?: ImageData;
    reprocessCb: (imageType: ImageToShowType) => void;
    isReprocessed: boolean
}> = ({ imageType, imageData, reprocessCb, isReprocessed }) => {
    const setImageData = useProcessedData((s) => s.setImageData);
    const [selectedCluster, setSelectedCluster] = useState<ISelectedCluster>('original')
    const [originalImage, setOriginalImage] = useState<Uint8ClampedArray | []>([])
    const [clusterOneImage, setClusterOneImage] = useState<Uint8ClampedArray | []>([])
    const [clusterTwoImage, setClusterTwoImage] = useState<Uint8ClampedArray | []>([])
    const [clusterThreeImage, setClusterThreeImage] = useState<Uint8ClampedArray | []>([])
    const handleReprocess = () => {

        reprocessCb(imageType)
        if (imageData) {
            let original = structuredClone(imageData)
            let reusult = fuzzy(imageData.data)
            setOriginalImage(original.data)
            setClusterOneImage(reusult.cluster1)
            setClusterTwoImage(reusult.cluster2)
            setClusterThreeImage(reusult.cluster3)
        }
        // setIsReprocessed(true)
    };

    const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event) {
            // @ts-ignore
            setSelectedCluster(event.target.value);
        }
    }

    const applyCluster = (cluster: Uint8ClampedArray) => {
        let newImageData = new ImageData(
            cluster,
            imageData?.width || 0,
            imageData?.height || 0
        );
        if (imageType === "disk") {
            setImageData("diskImageData", newImageData);
        } else {
            setImageData("cupImageData", newImageData);
        }
    }
    useEffect(() => {
        console.log({ originalImage, clusterOneImage, clusterTwoImage })

        if (selectedCluster === "cluster1" && clusterOneImage.length > 0) {
            applyCluster(clusterOneImage as Uint8ClampedArray)
        } else if (selectedCluster === "cluster2" && clusterTwoImage.length > 0) {
            applyCluster(clusterTwoImage as Uint8ClampedArray)
        } else if (selectedCluster === "cluster3" && clusterThreeImage.length > 0) {
            applyCluster(clusterThreeImage as Uint8ClampedArray)
        }
        else if (selectedCluster === "original" && originalImage.length > 0) {
            applyCluster(originalImage as Uint8ClampedArray)
        }
    }, [selectedCluster])
    return (
        <div className=" font-normal">
            Not what youre looking for ? <button className=" font-bold underline " onClick={handleReprocess}>Reprocess {imageType}</button>
            {
                isReprocessed &&
                <form>
                    <div>
                        <input onChange={handleClusterChange} type="radio" id="original" name="cluster" value="original" checked={selectedCluster === "original"} />
                        <label htmlFor={"original"}>Original</label>
                    </div>
                    <div>
                        <input onChange={handleClusterChange} type="radio" id="cluster1" name="cluster" value="cluster1" checked={selectedCluster === "cluster1"} />
                        <label htmlFor={"cluster1"}>Cluster 1</label>
                    </div>

                    <div>
                        <input onChange={handleClusterChange} type="radio" id="cluster2" name="cluster" value="cluster2" checked={selectedCluster === "cluster2"} />
                        <label htmlFor={"cluster2"}>Cluster 2</label>
                    </div>

                        <div>
                            <input onChange={handleClusterChange} type="radio" id="cluster3" name="cluster" value="cluster3" checked={selectedCluster === "cluster3"} />
                            <label htmlFor={"cluster3"}>Cluster 3</label>
                        </div>
                </form>
            }
        </div>
    );
};

export default ReProcess;
