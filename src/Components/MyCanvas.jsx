import React, { useState, useEffect, useCallback, useRef } from "react";
import { Layer, Stage, Rect, Line } from "react-konva";
import { Rectangle } from "./Shapes/Rectangle";

export const MyCanvas = ({ mouseState, shapes }) => {
  const [isAdjusting, setIsAdjusting] = useState(false); // Add this state
  const [rectangles, setRectangles] = useState(shapes?.rectangles || []);
  const [drawingRectangle, setDrawingRectangle] = useState(null);
  const [selectedRectangles, setSelectedRectangles] = useState([]);
  const [lines, setLines] = useState([]);

  const isDrawing = useRef(false);


  const handleRectangleMouseDown = (event) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    setDrawingRectangle({ x, y, width: 0, height: 0 });
  };

  const handleLineMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { mouseState, points: [pos.x, pos.y] }]);
  };

  const handleLineMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  const handleLineMouseUp = (e) => {
    isDrawing.current = false;
  }

  const handleRectangleMouseUp = (event) => {
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

  const handleRectangleMouseMove = (event) => {
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

            return !(
              rectBounds.right < sx ||
              rectBounds.left > ex ||
              rectBounds.bottom < sy ||
              rectBounds.top > ey
            );
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
    }

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

  const pen = {
    handleMouseDown:handleLineMouseDown,
    handleMouseUp:handleLineMouseUp,
    handleMouseMove:handleLineMouseMove
  }

  const rectangle = {
    handleMouseDown:handleRectangleMouseDown,
    handleMouseUp:handleRectangleMouseUp,
    handleMouseMove:handleRectangleMouseMove
  }
  const pointer = {
    handleMouseDown:handleRectangleMouseDown,
    handleMouseUp:handleMultiSelect,
    handleMouseMove:handleMouseMoveSelect
  }

  const tools = {
    pen,
    rectangle,
    pointer
  }


  return (
    <Stage
      onMouseDown={tools[mouseState].handleMouseDown}
      onMouseUp={tools[mouseState].handleMouseUp}
      onMouseMove={tools[mouseState].handleMouseMove}
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
        {lines.map((line, i) => (
            <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
            />
        ))}
      </Layer>
    </Stage>
  );
};
