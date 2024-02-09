export class PointerTool {
  handleMouseDown(e, setDrawingRectangle) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setDrawingRectangle({ x, y, width: 0, height: 0 });
  }

  handleMouseMove(
      e,
      drawingRectangle,
      setDrawingRectangle,
      isAdjusting,
      shapes,
      selectedShapes,
      setSelectedShapes
  ) {
      if (drawingRectangle && !isAdjusting) {
          const ex = Math.max(drawingRectangle.x, e.evt.layerX);
          const ey = Math.max(drawingRectangle.y, e.evt.layerY);

          let sx = drawingRectangle.x;
          let sy = drawingRectangle.y;
          const { x, y } = e.target.getStage().getPointerPosition();
          setDrawingRectangle({
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              fill: 'rgba(30, 144, 255, 0.2)',
              strokeWidth: 0.75,
              stroke: '#1e90ff',
          });

          sx = Math.min(drawingRectangle.x, e.evt.layerX);
          sy = Math.min(drawingRectangle.y, e.evt.layerY);

          const selectedRects = shapes.rectangles
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

          const selectedEllipses = shapes.ellipses
              .filter((ellps) => {
                  const ellpsBounds = {
                      left: ellps.x - ellps.width / 2,
                      top: ellps.y - ellps.height / 2,
                      right: ellps.x + ellps.width + ellps.width / 2,
                      bottom: ellps.y + ellps.height + ellps.height / 2,
                  };

                  return !(
                      ellpsBounds.right < sx ||
                      ellpsBounds.left > ex ||
                      ellpsBounds.bottom < sy ||
                      ellpsBounds.top > ey
                  );
              })
              .map((ellps) => ellps.id);

          const selectedTexts = shapes.texts
              .filter((text) => {
                  const textBounds = {
                      left: text.x,
                      top: text.y,
                      right: text.x + text.width,
                      bottom: text.y + text.height,
                  };

                  return !(
                      textBounds.right < sx ||
                      textBounds.left > ex ||
                      textBounds.bottom < sy ||
                      textBounds.top > ey
                  );
              })
              .map((text) => text.id);

          const selectedLines = shapes.lines
              .filter((line) => {
                  const lineBounds = {
                      left: line.x,
                      top: line.y,
                      right: line.x + line.width,
                      bottom: line.y + line.height,
                  };

                  return !(
                      lineBounds.right < sx ||
                      lineBounds.left > ex ||
                      lineBounds.bottom < sy ||
                      lineBounds.top > ey
                  );
              })
              .map((line) => line.id);

          const selectedImages = shapes.images
              .filter((image) => {
                  const imageBounds = {
                      left: image.x,
                      top: image.y,
                      right: image.x + image.width,
                      bottom: image.y + image.height,
                  };

                  return !(
                      imageBounds.right < sx ||
                      imageBounds.left > ex ||
                      imageBounds.bottom < sy ||
                      imageBounds.top > ey
                  );
              })
              .map((image) => image.id);

          setSelectedShapes({
              ...selectedShapes,
              rectangles: selectedRects,
              ellipses: selectedEllipses,
              texts: selectedTexts,
              lines: selectedLines,
              images: selectedImages,
          });
      }
  }

  handleMouseUp(setDrawingRectangle) {
      setDrawingRectangle(null);
  }
}
