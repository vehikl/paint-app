export class PenTool {
  handleMouseDown(e, isDrawing, setShapes, shapes, mouseState) {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setShapes({...shapes, lines: [...shapes.lines, { mouseState, points: [pos.x, pos.y] }]})
  }

  handleMouseMove(e,isDrawing, shapes, setShapes) {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = shapes.lines[shapes.lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastLine.id = Math.random().toString(36).substring(2, 6);
    shapes.lines.splice(shapes.lines.length - 1, 1, lastLine);
    setShapes({...shapes, lines: shapes.lines.concat()});
  }

  handleMouseUp(isDrawing) {
    isDrawing.current = false;
  }

  handleSelectShape(e, setSelectedShapes, setIsAdjusting) {
    setSelectedShapes({ pen: [e.target.attrs.id] });
    setIsAdjusting(true); // Set the flag to true when adjusting
  }
}