import React, { FC } from 'react'
import { ImageToShowType } from '../store/useDisaplyResult'
import Button from './Button'

const ReProcess: FC<{
    imageType: ImageToShowType
}> = ({ imageType }) => {
    return (
        <div>
            <Button>Reprocess {imageType}</Button>
        </div>
    )
}

export default ReProcess