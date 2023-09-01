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

  handleMouseUp(e, drawingRectangle, setDrawingRectangle, rectangles, setRectangles, setSelectedRectangles) {
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
      setRectangles([...rectangles, rectangleToAdd]);
      setSelectedRectangles([rectangleToAdd.id]);
    }
  }

  handleSelectRectangle(e, setSelectedRectangles, setIsAdjusting) {
    setSelectedRectangles([e.target.attrs.id]);
    setIsAdjusting(true); // Set the flag to true when adjusting
  }
}