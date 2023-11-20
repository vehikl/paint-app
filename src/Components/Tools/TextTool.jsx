export class TextTool {
  handleMouseDown(e, texts, setTexts) {
    const { x, y } = e.target.getStage().getPointerPosition();
    const defaultText = { x, y, fontSize: 16, text: "Type Here" };

    setTexts([...texts, defaultText]);
  }

  handleMouseMove() {
  }

  handleMouseUp() {
  }

  handleTextDoubleClick(index, texts, setTexts) {
    const newTexts = texts.map((text, i) =>
      i === index ? { ...text, editing: true } : text
    );
    setTexts(newTexts);
  }
}