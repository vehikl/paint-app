export class RectangleTool {
  handleMouseDown(e, setDrawingRectangle) {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDrawingRectangle({ x, y, width: 0, height: 0 });
  }

  handleMouseMove(e, drawingRectangle, setDrawingRectangle) {
    if (drawingRectangle) {
      const sx = drawingRectangle.x;
      const sy = drawingRectangle.y;
      const { x, y } = e.target.getStage().getPointerPosition();
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

  handleMouseUp(
    e,
    drawingRectangle,
    setDrawingRectangle,
    shapes,
    setShapes,
    selectedShapes,
    setSelectedShapes
  ) {
    if (drawingRectangle) {
      const sx = drawingRectangle.x;
      const sy = drawingRectangle.y;
      const { x, y } = e.target.getStage().getPointerPosition();
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

      const updatedShapes = {
        ...shapes,
        rectangles: [...shapes.rectangles, rectangleToAdd],
      };

      setShapes(updatedShapes);
      setSelectedShapes({...selectedShapes, rectangles: [rectangleToAdd.id]});
    }
  }

  handleSelectShape(e, selectedShapes, setSelectedShapes, setIsAdjusting) {
    setSelectedShapes({ ...selectedShapes, rectangles: [e.target.attrs.id] });
    setIsAdjusting(true);
  }
}
