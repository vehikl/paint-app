import React, { useRef } from "react";
import { Text, Transformer } from "react-konva";

export const TextShape = ({
  x,
  y,
  draggable,
  isSelected,
  text,
  onSelect,
  onChange,
  setIsAdjusting,
  ...props
}) => {
  const textRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        {...text}
        x={x}
        y={y}
        draggable={draggable}
        ref={textRef}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // reset scale
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...props,
            text: node.text(),
            id: node.id,
            x: node.x(),
            y: node.y(),
            fontSize: node.fontSize() * scaleX,
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            rotation: node.rotation(),
          });
          setIsAdjusting(false);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
