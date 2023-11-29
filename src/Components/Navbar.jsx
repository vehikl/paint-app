import React, { useEffect, useState } from "react";
import { FaEraser, FaFile } from "react-icons/fa";
import { PiCursorBold, PiRectangleBold, PiCircleBold } from "react-icons/pi";
import { BsVectorPen } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { CgFormatText } from "react-icons/cg";
import NavbarItem from "./NavbarItem"; // Import the NavbarItem component

const icons = [
  { Icon: PiCursorBold, state: "pointer" },
  {
    Icon: PiRectangleBold,
    state: "rectangle",
    children: [
      { Icon: PiRectangleBold, state: "rectangle" },
      { Icon: PiCircleBold, state: "ellipse" },
    ],
  },
  { Icon: CgFormatText, state: "text" },
  {
    Icon: BsVectorPen,
    state: "pen",
    children: [
      { Icon: BsVectorPen, state: "pen" },
      { Icon: FaEraser, state: "eraser" },
    ],
  },
  { Icon: RiImageAddLine, state: "image" },
];

export const Navbar = ({ mouseState, setMouseState }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(null);

  const handleMouseStateChange = (state, icon) => {
    setMouseState(state);
    setCurrentIcon(icon);
  };

  const handleMouseLeave = () => {
    setShowChildren(false);
    setCurrentIcon(null);
  };

  const handleHover = () => {
    if (currentIcon && currentIcon.state !== "pen") setShowChildren(false);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.target.classList.contains("child")) {
        const childState = e.target.getAttribute("data-state");
        handleMouseStateChange(childState, currentIcon);
        setShowChildren(false);
      }
    };

    window.addEventListener("mousedown", handleKeydown);

    return () => {
      window.removeEventListener("mousedown", handleKeydown);
    };
  }, [currentIcon, handleMouseStateChange]);

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <FaFile className="navbarIcon" />
        {icons.map(({ Icon, state, children }) => (
          <NavbarItem
            key={state}
            Icon={Icon}
            state={state}
            mouseState={mouseState}
            currentIcon={currentIcon}
            handleMouseStateChange={handleMouseStateChange}
            handleHover={handleHover}
            showChildren={showChildren[state]}
            setShowChildren={(value) =>
              setShowChildren({ ...showChildren, [state]: value })
            }
            handleMouseLeave={handleMouseLeave}
            className="navbarIcon"
            childIcons={children}
          >
            {children}
          </NavbarItem>
        ))}
      </div>
    </div>
  );
};
