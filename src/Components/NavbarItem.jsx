import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const NavbarItem = ({
  Icon,
  state,
  mouseState,
  children,
  handleMouseStateChange,
  handleHover,
  showChildren,
  setShowChildren,
  handleMouseLeave,
}) => {
  const [currentDisplayedIcon, setCurrentDisplayedIcon] = useState(Icon);
  const [selectedTool, setSelectedTool] = useState(state);

  const handleChildIconClick = (childState, ChildIcon) => {
    setCurrentDisplayedIcon(ChildIcon);
    setSelectedTool(childState);
    handleMouseStateChange(childState, ChildIcon);
  };

  useEffect(() => {
    setCurrentDisplayedIcon(Icon);
  }, [Icon]);

  return (
    <div className="iconContainer">
      <div
        className={`navbarIcon ${mouseState === selectedTool ? "active" : ""} ${
          selectedTool === "eraser" && state === "eraser" ? "selected" : ""
        }`}
        onClick={() =>
          handleMouseStateChange(selectedTool, currentDisplayedIcon || Icon)
        }
        onMouseOver={() => handleHover()}
      >
        {currentDisplayedIcon || <Icon />}
      </div>

      {children && (
        <FaChevronDown
          size={10}
          className="navbarIcon caret"
          onClick={() => setShowChildren(true)}
        />
      )}

      {children && showChildren && (
        <div className="childToolDropdown" onMouseLeave={handleMouseLeave}>
          {children.map(({ Icon: ChildIcon, state: childState }) => (
            <div
              key={childState}
              className={`navbarIcon child ${
                mouseState === childState ? "active" : ""
              }`}
              onClick={() => handleChildIconClick(childState, ChildIcon)}
              data-state={childState}
            >
              <ChildIcon />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarItem;
