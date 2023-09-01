export class PointerTool {
  handleMouseDown(e, setDrawingRectangle) {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDrawingRectangle({ x, y, width: 0, height: 0 });
  }

  handleMouseMove(e, drawingRectangle, setDrawingRectangle, isAdjusting, rectangles, setSelectedRectangles) {
    if (drawingRectangle && !isAdjusting) {
      const sx = Math.min(drawingRectangle.x, e.evt.layerX);
      const sy = Math.min(drawingRectangle.y, e.evt.layerY);
      const ex = Math.max(drawingRectangle.x, e.evt.layerX);
      const ey = Math.max(drawingRectangle.y, e.evt.layerY);

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

      const { x, y } = e.target.getStage().getPointerPosition();
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

  handleMouseUp(setDrawingRectangle) {
    setDrawingRectangle(null);
  }
}