import React, { useState, useEffect, useRef } from "react";
import { Layer, Stage, Rect, Line } from "react-konva";
import { Rectangle } from "./Shapes/Rectangle";
import { PenTool, PointerTool, RectangleTool } from "./Tools";
import { EraserTool } from "./Tools/EraserTool";

export const MyCanvas = ({ mouseState, shapes }) => {
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [rectangles, setRectangles] = useState(shapes?.rectangles || []);
  const [drawingRectangle, setDrawingRectangle] = useState(null);
  const [selectedRectangles, setSelectedRectangles] = useState([]);
  const [lines, setLines] = useState([]);

  const isDrawing = useRef(false);

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

  const penTool = new PenTool();
  const eraserTool = new EraserTool();
  const rectangleTool = new RectangleTool();
  const pointerTool = new PointerTool();

  const tools = {
    pen: {
      handleMouseDown: (e) =>
        penTool.handleMouseDown(e, isDrawing, setLines, lines, mouseState),
      handleMouseMove: (e) =>
        penTool.handleMouseMove(e, isDrawing, lines, setLines),
      handleMouseUp: (e) => penTool.handleMouseUp(isDrawing),
    },
    eraser: {
      handleMouseDown: (e) =>
        eraserTool.handleMouseDown(e, isDrawing, setLines, lines, mouseState),
      handleMouseMove: (e) =>
        eraserTool.handleMouseMove(e, isDrawing, lines, setLines),
      handleMouseUp: (e) => eraserTool.handleMouseUp(isDrawing),
    },

    rectangle: {
      handleMouseDown: (e) =>
        rectangleTool.handleMouseDown(e, setDrawingRectangle),
      handleMouseMove: (e) =>
        rectangleTool.handleMouseMove(e, drawingRectangle, setDrawingRectangle),
      handleMouseUp: (e) =>
        rectangleTool.handleMouseUp(
          e,
          drawingRectangle,
          setDrawingRectangle,
          rectangles,
          setRectangles,
          setSelectedRectangles
        ),
    },
    pointer: {
      handleMouseDown: (e) =>
        pointerTool.handleMouseDown(e, setDrawingRectangle),
      handleMouseMove: (e) =>
        pointerTool.handleMouseMove(
          e,
          drawingRectangle,
          setDrawingRectangle,
          isAdjusting,
          rectangles,
          setSelectedRectangles
        ),
      handleMouseUp: (e) => pointerTool.handleMouseUp(setDrawingRectangle),
    },
  };

  return (
    <Stage
      onMouseDown={(e) => tools[mouseState].handleMouseDown(e)}
      onMouseMove={(e) => tools[mouseState].handleMouseMove(e)}
      onMouseUp={(e) => tools[mouseState].handleMouseUp(e)}
      width={window.innerWidth}
      height={window.innerHeight}
      className={"myCanvas"}
      style={{ cursor: mouseState === "pointer" ? "default" : "crosshair" }}
    >
      <Layer>{drawingRectangle && <Rect {...drawingRectangle} />}</Layer>
      <Layer>
        {rectangles.map((rect, index) => (
          <Rectangle
            onSelect={(e) =>
              rectangleTool.handleSelectRectangle(
                e,
                setSelectedRectangles,
                setIsAdjusting
              )
            }
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
