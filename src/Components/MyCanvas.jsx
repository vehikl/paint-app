import React, { useState } from "react";
import { Layer, Stage, Rect } from "react-konva";
import { Rectangle } from "./Shapes/Rectangle";

export const MyCanvas = ({ mouseState, shapes }) => {
  const [rectangles, setRectangles] = useState(shapes?.rectangles || []);
  const [drawingRectangle, setDrawingRectangle] = useState(null);
  const [selectedRectangles, setSelectedRectangles] = useState([]);

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
        strokeWidth: 0.75,
      };
      setDrawingRectangle(null);
      setRectangles([...rectangles, rectangleToAdd]);
      setSelectedRectangles([rectangles.length]);
    }
  };

  const handleMultiSelect = (event) => {
    if (drawingRectangle) {
      setDrawingRectangle(null);
      /* all the rectangles within the selection area or intersecting the selection area */
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
        strokeWidth: 0.75,
        stroke: "black",
        dash: [10, 5],
      });
    }
  };

  const handleMouseMoveSelect = (event) => {
    if (drawingRectangle) {
      const sx = drawingRectangle.x;
      const sy = drawingRectangle.y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setDrawingRectangle({
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        fill: "rgba(30, 144, 255, 0.2)",
        strokeWidth: 0.75,
        stroke: "#1e90ff",
      });
    }
  };
  const handleSelectRectangle = (index) => {
    setSelectedRectangles([index]);
  };

  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={mouseState === "rectangle" ? handleMouseUp : handleMultiSelect}
      onMouseMove={
        mouseState === "rectangle" ? handleMouseMove : handleMouseMoveSelect
      }
      width={window.innerWidth}
      height={window.innerHeight}
      className={"myCanvas"}
      style={{ cursor: mouseState === "pointer" ? "default" : "crosshair" }}
    >
      <Layer>
        {drawingRectangle && (
          <Rect {...drawingRectangle} />
        )}
        {rectangles.map((rect, index) => (
          <Rectangle
            onSelect={() => handleSelectRectangle(index)}
            onChange={(newAttrs) => {
              const rects = rectangles.slice();
              rects[index] = newAttrs;
              setRectangles(rects);
            }}
            isSelected={selectedRectangles.includes(index)}
            key={index}
            {...rect}
            draggable={mouseState === "pointer"}
          />
        ))}
      </Layer>
    </Stage>
  );
};
