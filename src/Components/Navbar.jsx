import React from "react";
import { FaFile } from "react-icons/fa";
import { PiCursorBold, PiRectangleBold } from "react-icons/pi";
import { BsVectorPen } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { CgFormatText } from "react-icons/cg";

export const Navbar = ({ mouseState, setMouseState }) => {
  const handleMouseStateChange = (state) => {
    setMouseState(state);
  };

  const icons = [
    { icon: PiCursorBold, state: "pointer" },
    { icon: PiRectangleBold, state: "rectangle" },
    { icon: CgFormatText, state: "text" },
    { icon: BsVectorPen, state: "pen" },
    { icon: RiImageAddLine, state: "image" },
  ];

  return (
    <div className="navbarContainer">
      <div className="navbar">
      <FaFile className='navbarIcon'/>
        {icons.map(({ icon: Icon, state }) => (
          <Icon
            key={state}
            className={`navbarIcon ${mouseState === state ? "active" : ""}`}
            onClick={() => handleMouseStateChange(state)}
          />
        ))}
      </div>
    </div>
  );
};
