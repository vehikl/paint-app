import React, { useEffect, useMemo, useState } from "react";
import { FaEraser, FaFile } from "react-icons/fa";
import { PiCursorBold, PiRectangleBold, PiCircleBold } from "react-icons/pi";
import { BsVectorPen } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { CgFormatText } from "react-icons/cg";
import { Modal, FileUploader } from "@twizzle-library/twizzle-library";
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

export const Navbar = ({ mouseState, setMouseState, setImages }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(null);

  const [imageModal, setImageModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleMouseStateChange = (state, icon) => {
    setMouseState(state);

    if (state == "image") {
      setImageModal(true);
    }
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

  // const images = JSON.parse(localStorage.getItem("images")) || [];

  const images = useMemo(() => {
    return JSON.parse(localStorage.getItem("images")) || [];
  }, []);

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
        {imageModal && (
          <Modal
            onClose={() => setImageModal(false)}
            style={{
              backgroundColor: "red",
            }}
            title="Upload Image"
            onConfirm={() => {
              setImageModal(false);

              localStorage.setItem(
                "images",
                JSON.stringify([...images, uploadedImage])
              );
              setImages([...images, uploadedImage]);
            }}
          >
            <FileUploader
              style={{ width: "100%", margin: "0 auto" }}
              fileTypes={["image/*"]}
              onUpload={(fileList) => {
                const file = fileList[0];

                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setUploadedImage({
                      src: reader.result,
                      name: file.name,
                    });
                  };
                }
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
