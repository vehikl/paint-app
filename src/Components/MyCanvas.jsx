import React, {useState, useEffect, useCallback} from "react";
import {Layer, Stage, Rect} from "react-konva";
import {Rectangle} from "./Shapes/Rectangle";

export const MyCanvas = ({mouseState, shapes}) => {
    const [rectangles, setRectangles] = useState(shapes?.rectangles || []);
    const [drawingRectangle, setDrawingRectangle] = useState(null);
    const [selectedRectangles, setSelectedRectangles] = useState([]);

    const handleMouseDown = (event) => {
        const {x, y} = event.target.getStage().getPointerPosition();
        setDrawingRectangle({x, y, width: 0, height: 0});
    };

    const handleMouseUp = (event) => {
        if (drawingRectangle) {
            const sx = drawingRectangle.x;
            const sy = drawingRectangle.y;
            const {x, y} = event.target.getStage().getPointerPosition();
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
            const {x, y} = event.target.getStage().getPointerPosition();
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
    }

    const handleMouseMoveSelect = useCallback((event) => {
        if(drawingRectangle)
        {
            const selectedRects = rectangles.filter((rect, index) => {
                const rectBounds = {
                    left: rect.x,
                    top: rect.y,
                    right: rect.x + rect.width,
                    bottom: rect.y + rect.height,
                }
                const drawingBounds = {
                    left: drawingRectangle.x,
                    top: drawingRectangle.y,
                    right: drawingRectangle.x + drawingRectangle.width,
                    bottom: drawingRectangle.y + drawingRectangle.height,
                };
                const intersects = !(
                    rectBounds.right < drawingBounds.left ||
                    rectBounds.left > drawingBounds.right ||
                    rectBounds.bottom < drawingBounds.top ||
                    rectBounds.top > drawingBounds.bottom
                );

                const sx = drawingRectangle.x;
                const sy = drawingRectangle.y;
                const {x, y} = event.target.getStage().getPointerPosition();
                setDrawingRectangle({
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    fill: "rgba(30, 144, 255, 0.2)",
                    strokeWidth: 0.75,
                    stroke: "#1e90ff",
                });

                return intersects;
            }).map((rect) => {
                return rect.id;
            })
            setSelectedRectangles(selectedRects)
        }

    }, [selectedRectangles, mouseState, drawingRectangle]);
    const handleSelectRectangle = (event) => {

        setSelectedRectangles([event.target.attrs.id]);
    };
    console.log(selectedRectangles);


    useEffect(() => {
        const handleDeleteKeyPress = (event) => {
            if (event.keyCode === 8) {

                const updatedRectangles = rectangles.filter(
                    (_, index) => !selectedRectangles.includes(index)
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
            style={{cursor: mouseState === "pointer" ? "default" : "crosshair"}}
        >
            <Layer>
                {drawingRectangle && <Rect {...drawingRectangle} />}
                {rectangles.map((rect, index) => (
                    <Rectangle
                        onSelect={(event) => handleSelectRectangle(event)}
                        onChange={(newAttrs) => {
                            const rects = rectangles.slice();
                            rects[index] = newAttrs;
                            setRectangles(rects);
                        }}
                        isSelected={
                        selectedRectangles.includes(rect.id)
                        }
                        key={index}
                        {...rect}
                        draggable={mouseState === "pointer"}
                    />
                ))}
            </Layer>
        </Stage>
    );
};
