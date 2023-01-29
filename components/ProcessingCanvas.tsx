import React, { FC } from "react";
import Marker from "./Marker";
import useDisplayResult from "../store/useDisaplyResult";
import useCdrCalculations from "../store/useCdrCalculation";

const ProcessingCanvas:FC<{
    preprocessCanvasRef:any
}> = ({
    preprocessCanvasRef
}) => {
    const displayResultState = useDisplayResult((s) => s);
    const cdrCalculationsState = useCdrCalculations((s) => s);
  return (
    <>
      <div>
        {displayResultState.imageToShow !== "current" && (
          <>
            <Marker
              limit={preprocessCanvasRef.current?.clientWidth}
              markerPostion={(pos) => {
                displayResultState.imageToShow === "cup"
                  ? cdrCalculationsState.setCup({ x1: pos })
                  : cdrCalculationsState.setDisk({ x1: pos });
              }}
            />
            <Marker
              limit={preprocessCanvasRef.current?.clientWidth}
              markerPostion={(pos) => {
                displayResultState.imageToShow === "cup"
                  ? cdrCalculationsState.setCup({ x2: pos })
                  : cdrCalculationsState.setDisk({ x2: pos });
              }}
            />
            <Marker
              direction="verticle"
              limit={preprocessCanvasRef.current?.clientHeight}
              markerPostion={(pos) => {
                displayResultState.imageToShow === "cup"
                  ? cdrCalculationsState.setCup({ y1: pos })
                  : cdrCalculationsState.setDisk({ y1: pos });
              }}
            />
            <Marker
              direction="verticle"
              limit={preprocessCanvasRef.current?.clientHeight}
              markerPostion={(pos) => {
                displayResultState.imageToShow === "cup"
                  ? cdrCalculationsState.setCup({ y2: pos })
                  : cdrCalculationsState.setDisk({ y2: pos });
              }}
            />
          </>
        )}
        <canvas
          ref={preprocessCanvasRef}
          style={{
            position: "absolute",
            border: "1px solid black",
            objectFit: "contain",
            width: "100%",
            height: "100%",
            //orderRadius: "50%"
          }}
        ></canvas>
      </div>
    </>
  );
};

export default ProcessingCanvas;
