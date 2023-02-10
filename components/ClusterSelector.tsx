import React, { FC } from 'react'
import { ImageToShowType } from '../store/useDisaplyResult'

const ClusterSelector: FC<{
    handleClusterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    imageType: ImageToShowType
}> = ({
    handleClusterChange,
    imageType
}) => {
        if (imageType === "cup") {

            return (
                <form>
                    <div>
                        <input onChange={handleClusterChange} type="radio" id="c3" name="cluster" value="c3" />
                        <label htmlFor={"c3"}>Original</label>
                    </div>
                    <div>
                        <input onChange={handleClusterChange} type="radio" id="c1" name="cluster" value="c1" />
                        <label htmlFor={"c1"}>Cluster 1</label>
                    </div>

                    <div>
                        <input onChange={handleClusterChange} type="radio" id="c2" name="cluster" value="c2" />
                        <label htmlFor={"c2"}>Cluster 2</label>
                    </div>

                </form>
            )
        } else {
            return (
                <form>
                    <div>
                        <input onChange={handleClusterChange} type="radio" id="d3" name="cluster" value="d3" />
                        <label htmlFor={"d3"}>Original</label>
                    </div>
                    <div>
                        <input onChange={handleClusterChange} type="radio" id="d1" name="cluster" value="d1" />
                        <label htmlFor={"d1"}>Cluster 1</label>
                    </div>

                    <div>
                        <input onChange={handleClusterChange} type="radio" id="d2" name="cluster" value="d2" />
                        <label htmlFor={"d2"}>Cluster 2</label>
                    </div>

                </form>
            )
        }
    }

export default ClusterSelector