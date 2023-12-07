import React, { useState, useEffect, useRef } from "react";
import { Layer, Stage, Rect, Line, Text, Ellipse } from "react-konva";
import { Rectangle } from "./Shapes/Rectangle";
import { EllipseComponent } from "./Shapes/Ellipse";

import {
  PenTool,
  PointerTool,
  RectangleTool,
  EllipseTool,
  EraserTool,
  TextTool,
} from "./Tools";
import { TextShape } from "./Shapes/TextShape";

const initialSelectedShapes = {
  rectangles: [],
  ellipses: [],
  lines: [],
  texts: [],
};

const cursorTypes = {
  pen: `crosshair`,
  eraser: "default",
  rectangle: "crosshair",
  ellipse: "crosshair",
  pointer: "default",
  text: "text",
};

export const MyCanvas = ({ mouseState, shapes, setShapes }) => {
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [drawingRectangle, setDrawingRectangle] = useState(null);
  const [drawingEllipse, setDrawingEllipse] = useState(null);
  const [selectedShapes, setSelectedShapes] = useState(initialSelectedShapes);

  const isDrawing = useRef(false);

  useEffect(() => {
    const handleDeleteKeyPress = (event) => {
      if (event.keyCode === 8) {
        const updatedShapes = {
          ...shapes,
          rectangles: shapes.rectangles.filter(
            (rect) => !selectedShapes.rectangles.includes(rect.id)
          ),
          ellipses: shapes.ellipses.filter(
            (ellps) => !selectedShapes.ellipses.includes(ellps.id)
          ),
          lines: shapes.lines.filter(
            (line) => !selectedShapes.lines.includes(line.id)
          ),
          texts: shapes.texts.filter(
            (text) => !selectedShapes.texts.includes(text.id)
          ),
        };
        setShapes(updatedShapes);

        setSelectedShapes(initialSelectedShapes);
      }
    };

    document.addEventListener("keydown", handleDeleteKeyPress);

    return () => {
      document.removeEventListener("keydown", handleDeleteKeyPress);
    };
  }, [shapes, setShapes, selectedShapes]);

  const penTool = new PenTool();
  const textTool = new TextTool();
  const eraserTool = new EraserTool();
  const rectangleTool = new RectangleTool();
  const ellipseTool = new EllipseTool();
  const pointerTool = new PointerTool();

  const tools = {
    pen: {
      handleMouseDown: (e) =>
        penTool.handleMouseDown(e, isDrawing, setShapes, shapes, mouseState),
      handleMouseMove: (e) =>
        penTool.handleMouseMove(e, isDrawing, shapes, setShapes),
      handleMouseUp: (e) => penTool.handleMouseUp(isDrawing),
    },
    eraser: {
      handleMouseDown: (e) =>
        eraserTool.handleMouseDown(e, isDrawing, setShapes, shapes, mouseState),
      handleMouseMove: (e) =>
        eraserTool.handleMouseMove(e, isDrawing, shapes, setShapes),
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
          shapes,
          setShapes,
          selectedShapes,
          setSelectedShapes
        ),
    },

    ellipse: {
      handleMouseDown: (e) => ellipseTool.handleMouseDown(e, setDrawingEllipse),
      handleMouseMove: (e) =>
        ellipseTool.handleMouseMove(e, drawingEllipse, setDrawingEllipse),
      handleMouseUp: (e) =>
        ellipseTool.handleMouseUp(
          e,
          drawingEllipse,
          setDrawingEllipse,
          shapes,
          setShapes,
          selectedShapes,
          setSelectedShapes
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
          shapes,
          selectedShapes,
          setSelectedShapes
        ),
      handleMouseUp: (e) => pointerTool.handleMouseUp(setDrawingRectangle),
    },
    text: {
      handleMouseDown: (e) => textTool.handleMouseDown(e, shapes, setShapes, setSelectedShapes),
      handleMouseMove: (e) => textTool.handleMouseMove(),
      handleMouseUp: () => textTool.handleMouseUp(),
      handleTextDoubleClick: (index) =>
        textTool.handleTextDoubleClick(index, shapes, setShapes),
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
      style={{
        cursor: cursorTypes[mouseState] || "default",
      }}
    >
      <Layer>{drawingRectangle && <Rect {...drawingRectangle} />}</Layer>
      <Layer>
        {drawingEllipse && (
          <Ellipse
            x={drawingEllipse.x + drawingEllipse.width / 2}
            y={drawingEllipse.y + drawingEllipse.height / 2}
            radiusX={drawingEllipse.width / 2}
            radiusY={drawingEllipse.height / 2}
            fill="transparent"
            stroke="black"
            strokeWidth={0.75}
          />
        )}
      </Layer>
      <Layer>
        {shapes.rectangles.map((rect, index) => (
          <Rectangle
            onSelect={(e) =>
              rectangleTool.handleSelectShape(
                e,
                selectedShapes,
                setSelectedShapes,
                setIsAdjusting
              )
            }
            onChange={(newAttrs) => {
              const updatedShapes = {
                ...shapes,
                rectangles: shapes.rectangles.slice(),
              };
              updatedShapes.rectangles[index] = newAttrs;
              setShapes(updatedShapes);
            }}
            isSelected={selectedShapes.rectangles?.includes(rect.id)}
            key={index}
            {...rect}
            draggable={mouseState === "pointer"}
            setIsAdjusting={setIsAdjusting}
          />
        ))}
        {shapes.ellipses.map((ellipse, index) => (
          <EllipseComponent
            onSelect={(e) =>
              ellipse.handleSelectShape(
                e,
                selectedShapes,
                setSelectedShapes,
                setIsAdjusting
              )
            }
            onChange={(newAttrs) => {
              const updatedShapes = {
                ...shapes,
                ellipses: shapes.ellipses.slice(),
              };
              updatedShapes.rectangles[index] = newAttrs;
              setShapes(updatedShapes);
            }}
            isSelected={selectedShapes?.ellipses?.includes(ellipse.id)}
            key={index}
            {...ellipse}
            draggable={mouseState === "pointer"}
            setIsAdjusting={setIsAdjusting}
          />
        ))}
        {shapes.lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#000"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation="source-over"
          />
        ))}
      </Layer>
      <Layer>
        {shapes.texts.map((text, index) => {
          return (
            <TextShape
              x={text.x}
              y={text.y}
              draggable={mouseState === "pointer"}
              isSelected={selectedShapes.texts?.includes(text.id)}
              key={index}
              text={text}
              onSelect={(e) =>
                textTool.handleTextDoubleClick(index, shapes, setShapes)
              }
              onChange={(newAttrs) => {
                const updatedShapes = {
                  ...shapes,
                  texts: shapes.texts.slice(),
                };
                updatedShapes.texts[index] = newAttrs;
                setShapes(updatedShapes);
              }}
              setIsAdjusting={setIsAdjusting}
              />
          );
        })}
      </Layer>
    </Stage>
  );
};
