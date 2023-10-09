import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Data from "../data.json";
export default function Header({ filterItem, setItem, menuItems, itemCounts }) {
    const [isOpen, setIsOpen] = useState(false);
    const [kindOpen, setKindOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Project"); // 선택된 값을 관리
    const [catagoryValue, setCatagoryValue] = useState("All");
    let getAllCount = Data.length;
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const catagoryDropdown = () => {
        setKindOpen(!kindOpen);
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        if (isOpen) {
            setIsOpen(!isOpen);
        }
    };
    const handleCatagory = (value) => {
        setCatagoryValue(value);
        if (kindOpen) {
            setKindOpen(!kindOpen);
        }
    };
    const el = useRef();
    const handleCloseSelect = (e) => {
        if (isOpen && (!el.current || !el.current.contains(e.target))) setIsOpen(false);
    };
    const catagoryCloseSelect = (e) => {
        if (kindOpen && (!el.current || !el.current.contains(e.target))) setKindOpen(false);
    };
    useEffect(() => {
        window.addEventListener("click", handleCloseSelect);
        window.addEventListener("click", catagoryCloseSelect);
    });
    return (
        <header id="header" className="header" ref={el}>
            <div className="gnb">
                <div className="row-sel">
                    <div className={`custom-sel ${isOpen ? "open" : ""}`}>
                        <button type="button" onClick={toggleDropdown}>
                            {selectedValue}
                        </button>
                        <div className="list">
                            <div onClick={() => handleSelect("Project")}>
                                <Link to="/Project">Project</Link>
                            </div>
                            <div className="profile" onClick={() => handleSelect("Profile")}>
                                <Link to="/profile">Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`custom-sel ${kindOpen ? "open" : ""}`}>
                        <button type="button" onClick={catagoryDropdown}>
                            {catagoryValue}
                        </button>
                        <div className="list">
                            <div onClick={() => handleCatagory("All")}>
                                <button type="button" onClick={() => setItem(Data)}>
                                    All
                                </button>
                                <span>{getAllCount}</span>
                            </div>
                            {menuItems.map((Val, id) => {
                                return (
                                    <div onClick={() => handleCatagory(Val)} key={id}>
                                        <button type="button" onClick={() => filterItem(Val)}>
                                            {Val}
                                        </button>
                                        <span>{itemCounts[Val]}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
