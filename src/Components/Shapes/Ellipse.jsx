import { useRef, useEffect } from "react";
import { Ellipse, Transformer } from "react-konva";

export const EllipseComponent = ({
  isSelected,
  onSelect,
  onChange,
  setIsAdjusting,
  ...props
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Ellipse
        {...props}
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // reset scale
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...props,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
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
