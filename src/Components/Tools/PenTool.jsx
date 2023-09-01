export class PenTool {
  handleMouseDown(e, isDrawing, setLines, lines, mouseState) {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { mouseState, points: [pos.x, pos.y] }]);
  }

  handleMouseMove(e,isDrawing, lines, setLines) {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  handleMouseUp(isDrawing) {
    isDrawing.current = false;
  }
}