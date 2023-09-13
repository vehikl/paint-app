import React, {useEffect, useState} from "react";
import {FaEraser, FaFile} from "react-icons/fa";
import {PiCursorBold, PiRectangleBold} from "react-icons/pi";
import {BsVectorPen} from "react-icons/bs";
import {RiImageAddLine} from "react-icons/ri";
import {CgFormatText} from "react-icons/cg";

export const Navbar = ({mouseState, setMouseState}) => {
    const [showChildren, setShowChildren] = useState(false);
    const handleMouseStateChange = (state) => {
        setMouseState(state);
    };

    const icons = [
        {icon: PiCursorBold, state: "pointer"},
        {icon: PiRectangleBold, state: "rectangle"},
        {icon: CgFormatText, state: "text"},
        {
            icon: BsVectorPen, state: "pen", children:
                [
                    {icon: BsVectorPen, state: "pen"},
                    {icon: FaEraser, state: "eraser"},
                ]
        },
        {icon: RiImageAddLine, state: "image"},
    ];
    useEffect(() => {
        const handleKeydown = (e) => {
           //if clicked is child return
        }
        window.addEventListener('mousedown', handleKeydown)
        return () => {
            window.removeEventListener('mousedown', handleKeydown)
        }
    }, []);

    return (
        <div className="navbarContainer">
            <div className="navbar">
                <FaFile className='navbarIcon'/>
                {icons.map(({icon: Icon, state, children}) => (
                    <div className={'iconContainer'} key={state}>
                        <Icon
                            className={`navbarIcon ${mouseState === state ? "active" : ""}`}
                            onClick={() => handleMouseStateChange(state)}
                            onMouseOver={() => setShowChildren(true)}
                        />
                        {(children && showChildren) && (
                            <div className={'childToolDropdown'}>
                                {children.map(({icon: Icon, state}) => (
                                    <Icon
                                        key={state}
                                        className={`navbarIcon child ${mouseState === state ? "active" : ""}`}
                                        onClick={() => {
                                            handleMouseStateChange(state)
                                            setShowChildren(false)
                                        }}
                                    />
                                    ))
                                }
                            </div>
                        )}
                    </div>

                ))}
            </div>
        </div>
    );
};
