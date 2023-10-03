import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(""); // 선택된 값을 관리

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
        <header id="header" className="header">
            <div className="gnb">
                <Link to="/project">Wang.</Link>
                <div className="row-sel">
                    <div className={`custom-sel ${isOpen ? "open" : ""}`}>
                        <input type="text" className="blind" readOnly />
                        <button type="button" onClick={toggleDropdown}>
                            {selectedValue}
                        </button>
                        <ul>
                            <li onClick={() => handleSelect("Project")}>
                                <Link to="/project">Project</Link>
                            </li>
                            <li onClick={() => handleSelect("Profile")}>
                                <Link to="/profile">Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
