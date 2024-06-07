import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {FaHamburger, FaMinus, FaPlus } from 'react-icons/fa';
import NavbarItem from './NavbarItem';

export const Footer = ({zoom, setZoom}) => {

    return (
        <div className="zoomWrapper">
            <div className="zoom">
                <NavbarItem
                    state="zoom"
                    mouseState="zoom"
                    handleMouseStateChange={() => { if (zoom > 10) setZoom(zoom - 10) }}
                    handleHover={() => {}}
                    handleMouseLeave={() => {}}
                    Icon={FaMinus}
                />
                <p>{zoom}%</p>
                <NavbarItem
                    state="zoom"
                    mouseState="zoom"
                    handleMouseStateChange={() => { setZoom(zoom + 10) }}
                    handleHover={() => {}}
                    handleMouseLeave={() => {}}
                    Icon={FaPlus}
                />
            </div>
        </div>
    );
};
