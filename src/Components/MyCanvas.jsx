import React, { useState, useEffect, useCallback } from "react";
import { Layer, Stage, Rect } from "react-konva";
import { Rectangle } from "./Shapes/Rectangle";

export const MyCanvas = ({ mouseState, shapes }) => {
  const [isAdjusting, setIsAdjusting] = useState(false); // Add this state
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
        id: Math.random().toString(36).substring(2, 6),
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
      setSelectedRectangles([rectangleToAdd.id]);
    }
  };

  const handleMultiSelect = (event) => {
    setDrawingRectangle(null);
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

  const handleMouseMoveSelect = useCallback(
    (event) => {
      if (drawingRectangle && !isAdjusting) {
        let sx = Math.min(drawingRectangle.x, event.evt.layerX);
        let sy = Math.min(drawingRectangle.y, event.evt.layerY);
        let ex = Math.max(drawingRectangle.x, event.evt.layerX);
        let ey = Math.max(drawingRectangle.y, event.evt.layerY);

        const selectedRects = rectangles
          .filter((rect) => {
            const rectBounds = {
              left: rect.x,
              top: rect.y,
              right: rect.x + rect.width,
              bottom: rect.y + rect.height,
            };

            const intersects = !(
              rectBounds.right < sx ||
              rectBounds.left > ex ||
              rectBounds.bottom < sy ||
              rectBounds.top > ey
            );

            return intersects;
          })
          .map((rect) => rect.id);

        sx = drawingRectangle.x;
        sy = drawingRectangle.y;
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

        setSelectedRectangles(selectedRects);
      }
    },
    [rectangles, drawingRectangle]
  );

  const handleSelectRectangle = (event) => {
    setSelectedRectangles([event.target.attrs.id]);
    setIsAdjusting(true); // Set the flag to true when adjusting
  };

  const handleRectangleDragEnd = () => {
    setIsAdjusting(false); // Set the flag to false when dragging ends
  };

  useEffect(() => {
    const handleDeleteKeyPress = (event) => {
      if (event.keyCode === 8) {
        const updatedRectangles = rectangles.filter(
          (rect) => !selectedRectangles.includes(rect.id)
        );
        setRectangles(updatedRectangles);
        setSelectedRectangles([]);
      }
    };

    document.addEventListener("keydown", handleDeleteKeyPress);

    return () => {
      document.removeEventListener("keydown", handleDeleteKeyPress);
    };
  }, [rectangles, selectedRectangles]);

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
      <Layer>{drawingRectangle && <Rect {...drawingRectangle} />}</Layer>
      <Layer>
        {rectangles.map((rect, index) => (
          <Rectangle
            onSelect={(event) => handleSelectRectangle(event)}
            onChange={(newAttrs) => {
              const rects = rectangles.slice();
              rects[index] = newAttrs;
              setRectangles(rects);
            }}
            isSelected={selectedRectangles.includes(rect.id)}
            key={index}
            {...rect}
            draggable={mouseState === "pointer"}
          />
        ))}
      </Layer>
    </Stage>
  );
};