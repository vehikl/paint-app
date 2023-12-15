export class EllipseTool {
  handleMouseDown(e, setDrawingEllipse) {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDrawingEllipse({ x, y, width: 0, height: 0 });
  }

  handleMouseMove(e, drawingEllipse, setDrawingEllipse) {
    if (drawingEllipse) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const newWidth = x - drawingEllipse.x;
      const newHeight = y - drawingEllipse.y;

      const width = Math.abs(newWidth);
      const height = Math.abs(newHeight);

      setDrawingEllipse({
        x: drawingEllipse.x,
        y: drawingEllipse.y,
        width: width,
        height: height,
        negativeWidth: newWidth < 0,
        negativeHeight: newHeight < 0,
      });
    }
  }

  handleMouseUp(
    e,
    drawingEllipse,
    setDrawingEllipse,
    shapes,
    setShapes,
    selectedShapes,
    setSelectedShapes
  ) {
    if (drawingEllipse) {
      const { x, y } = e.target.getStage().getPointerPosition();

      const newWidth = x - drawingEllipse.x;
      const newHeight = y - drawingEllipse.y;

      const width = Math.abs(newWidth);
      const height = Math.abs(newHeight);

      const ellipsesToAdd = {
        id: Math.random().toString(36).substring(2, 6),
        x: drawingEllipse.x,
        y: drawingEllipse.y,
        width: width,
        height: height,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 0.75,
        negativeWidth: newWidth < 0,
        negativeHeight: newHeight < 0,
      };
      setDrawingEllipse(null);

      const updatedShapes = {
        ...shapes,
        ellipses: [...shapes.ellipses, ellipsesToAdd],
      };

      setShapes(updatedShapes);
      setSelectedShapes({ ...selectedShapes, ellipses: [ellipsesToAdd.id] });
    }
  }

  handleSelectShape(e, selectedShapes, setSelectedShapes, setIsAdjusting) {
    setSelectedShapes({ ...selectedShapes, ellipses: [e.target.attrs.id] });
    setIsAdjusting(true);
  }
}
