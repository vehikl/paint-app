export class EllipseTool {
  handleMouseDown(e, setDrawingEllipse) {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDrawingEllipse({ x, y, width: 0, height: 0 });
  }

  handleMouseMove(e, drawingEllipse, setDrawingEllipse) {
    if (drawingEllipse) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setDrawingEllipse({
        ...drawingEllipse,
        width: x - drawingEllipse.x,
        height: y - drawingEllipse.y,
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
    const ellipseToAdd = {
      id: Math.random().toString(36).substring(2, 6),
      x: drawingEllipse.x,
      y: drawingEllipse.y,
      width: x - drawingEllipse.x,
      height: y - drawingEllipse.y,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 0.75,
    };
    setDrawingEllipse(null);

    const updatedShapes = {
      ...shapes,
      ellipses: [...shapes.ellipses, ellipseToAdd],
    };

    setShapes(updatedShapes);
    setSelectedShapes({ ...selectedShapes, ellipses: [ellipseToAdd.id] });
  }
}

  handleSelectShape(e, selectedShapes, setSelectedShapes, setIsAdjusting) {
    setSelectedShapes({ ...selectedShapes, ellipses: [e.target.attrs.id] });
    setIsAdjusting(true);
  }
}
