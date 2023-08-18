import { useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

export const MyCanvas = ({ shapes }) => {
  const [rectangles, setRectangles] = useState(shapes?.rectangles || []);
  const [drawingRectangle, setDrawingRectangle] = useState(null);

  const handleMouseDown = (event) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    setDrawingRectangle({ x, y, width: 0, height: 0 });
  };

  const handleMouseUp = (event) => {
    if (drawingRectangle) {
      const sx = drawingRectangle.x;
      const sy = drawingRectangle.y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const rectangleToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        fill: "transparent",
        stroke: "black",
      };
      setDrawingRectangle(null);
      setRectangles([...rectangles, rectangleToAdd]);
    }
  };

  const handleMouseMove = (event) => {
    if (drawingRectangle) {
      const sx = drawingRectangle.x;
      const sy = drawingRectangle.y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setDrawingRectangle({
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        strokeWidth: 1,
      });
    }
  };


  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={window.innerWidth}
      height={window.innerHeight}
      className={"myCanvas"}
    >
      <Layer>
        {drawingRectangle && (
          <Rect
            x={drawingRectangle.x}
            y={drawingRectangle.y}
            width={drawingRectangle.width}
            height={drawingRectangle.height}
            fill="transparent"
            stroke="black"
            dash={[10, 5]}
          />
        )}
        {rectangles.map((rect, index) => (
          <Rect 
          key={index} 
          {...rect} 
          draggable />
        ))}
      </Layer>
    </Stage>
  );
};
