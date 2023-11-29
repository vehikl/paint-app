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
    const sx = drawingEllipse.x;
    const sy = drawingEllipse.y;
    const { x, y } = e.target.getStage().getPointerPosition();
    const ellipsesToAdd = {
      id: Math.random().toString(36).substring(2, 6),
      x: drawingEllipse.x + drawingEllipse.width/2,
      y: drawingEllipse.y + drawingEllipse.height/2,
      width: x - sx,
      height: y - sy,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 0.75,
    };
    setDrawingEllipse(null);

    const updatedShapes = {
      ...shapes,
      ellipses: [...shapes.ellipses, ellipsesToAdd],
    };

    setShapes(updatedShapes);
    setSelectedShapes({...selectedShapes, ellipses: [ellipsesToAdd.id]});
  }
}

  handleSelectShape(e, selectedShapes, setSelectedShapes, setIsAdjusting) {
    setSelectedShapes({ ...selectedShapes, ellipses: [e.target.attrs.id] });
    setIsAdjusting(true);
  }
}
