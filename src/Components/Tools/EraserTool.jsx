export class EraserTool {
  handleMouseDown(e, isDrawing, setLines, lines, mouseState) {
    isDrawing.current = true;
  }

  handleMouseMove(e, isDrawing, lines, setLines) {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    const newLines = [];

    lines.forEach((line) => {
      const points = line.points;
      const updatedPoints = [];

      let eraseLine = false; // Flag to determine if the entire line should be erased

      for (let i = 0; i < points.length; i += 2) {
        const x = points[i];
        const y = points[i + 1];

        const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);

        if (distance <= 10) {
          eraseLine = true;
          break; // If any point in the line is within the eraser, mark the line for erasure
        }
      }

      if (!eraseLine) {
        newLines.push({ mouseState: line.mouseState, points });
      }
    });

    setLines(newLines);
  }

  handleMouseUp(isDrawing) {
    isDrawing.current = false;
  }
}
