import React, { FC, useState } from 'react'
import Clusters from './Clusters';
import ReProcess from './ReProcess';

type Title = "Cup" | "Disk"

const PillColapse: FC<{
    title: Title;
    area: number;
    handleCalculateCallback: () => void
}> = ({
    title,
    area,
    handleCalculateCallback
}) => {
        const [showClusters, setShowClusters] = useState(false)

        const handleCalculate = () => {
            setShowClusters(true)
            handleCalculateCallback()
        }
        return (
            <div className='flex justify-between align-middle w-full h-20 bg-blue-300 rounded-xl m-5'>
                <span className=' self-center p-5 text-xl text-white  font-bold'>
                    {title}
                </span>
                <span className=' self-center p-5 text-xl text-white  font-bold'>
                    {!area ?
                        <button onClick={handleCalculate} className=' bg-lime-300 rounded-lg  text-green-600 p-2'>Calculate</button> :
                        area + 'px'
                    }
                </span>
                {
                    showClusters &&
                    <Clusters />
                }

            </div>
        )
    }

export default PillColapse