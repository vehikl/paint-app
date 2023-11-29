export class TextTool {
  handleMouseDown(e, shapes, setShapes) {
    const { x, y } = e.target.getStage().getPointerPosition();
    const defaultText = { x, y, fontSize: 16, text: "Type Here" };

    setShapes({ ...shapes, texts: [...shapes.texts, defaultText] });
  }

  handleMouseMove() {
  }

  handleMouseUp() {
  }

  handleTextDoubleClick(index, shapes, setShapes) {
    const newTexts = shapes.texts.map((text, i) =>
      i === index ? { ...text, editing: true } : text
    );

    setShapes({ ...shapes, texts: newTexts });
  }
}