import React, { useEffect, useState } from "react";
import { FaEraser, FaFile } from "react-icons/fa";
import { PiCursorBold, PiRectangleBold } from "react-icons/pi";
import { BsVectorPen } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { CgFormatText } from "react-icons/cg";
import {AiFillCaretDown} from "react-icons/ai";

export const Navbar = ({ mouseState, setMouseState }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(null);

  const handleMouseStateChange = (state, icon) => {
    setMouseState(state);
    setCurrentIcon(icon);
  };

  const icons = [
    { icon: PiCursorBold, state: "pointer" },
    { icon: PiRectangleBold, state: "rectangle" },
    { icon: CgFormatText, state: "text" },
    {
      icon: BsVectorPen,
      state: "pen",
      children: [
        { icon: BsVectorPen, state: "pen" },
        { icon: FaEraser, state: "eraser" },
      ],
    },
    { icon: RiImageAddLine, state: "image" },
  ];

  const handleParentIcon = (state, icon) => {
    setShowChildren(true);
    setCurrentIcon(icon);
    setMouseState(state);
  };

  const handleClick = (state, icon) => {
    setShowChildren(false);
    setCurrentIcon(icon);
    setMouseState(state);
  };

  const handleMouseLeave = () => {
    setShowChildren(false);
    setCurrentIcon(null);
  };

  const handleHover = () => {
    if (currentIcon.state !== "pen") setShowChildren(false);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.target.classList.contains("child")) {
        // Handle child icon click
        const childState = e.target.getAttribute("data-state");
        handleMouseStateChange(childState, currentIcon);
        setShowChildren(false);
      }
    };

    window.addEventListener("mousedown", handleKeydown);

    return () => {
      window.removeEventListener("mousedown", handleKeydown);
    };
  }, [currentIcon]);

  console.log(showChildren);

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <FaFile className="navbarIcon" />
        {icons.map(({ icon: Icon, state, children }) => (
          <div
            className={"iconContainer"}
            key={state}
          >
            <Icon
              className={`navbarIcon ${
                (mouseState === state || currentIcon === Icon) && !showChildren
                  ? "active"
                  : ""
              }`}
              onClick={() => handleMouseStateChange(state, Icon)}
              onMouseOver={() => handleHover()}
            />
            {children && (
              <AiFillCaretDown className="navbarIcon caret"
                onClick={() => setShowChildren(true)}
              />
            )}
            {children && showChildren && (
              <div
                className={"childToolDropdown"}
                onMouseLeave={() => handleMouseLeave()}
              >
                {children.map(({ icon: ChildIcon, state: childState }) => (
                  <ChildIcon
                    key={childState}
                    className={`navbarIcon child ${
                      mouseState === childState ? "active" : ""
                    }`}
                    onClick={() => {
                      handleMouseStateChange(childState, ChildIcon);
                      setShowChildren(false);
                    }}
                    data-state={childState}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
