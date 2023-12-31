export class TextTool {
  handleMouseDown(e, shapes, setShapes, setSelectedShapes) {
    const { x, y } = e.target.getStage().getPointerPosition();
    const defaultText = { x, y, fontSize: 16, text: "Type Here adasdasdasdsada" };
    defaultText.id = Math.random().toString(36).substring(2, 6);
    setShapes({ ...shapes, texts: [...shapes.texts, defaultText] });
    setSelectedShapes({ texts: [defaultText.id] });
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

  handleSelectShape(e, selectedShapes, setSelectedShapes) {
    setSelectedShapes({ ...selectedShapes, texts: [e.target.attrs.id] });
  }
}