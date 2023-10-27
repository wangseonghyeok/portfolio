/* eslint-disable no-loop-func */
import React, { useState, useEffect, useRef } from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Data from "../data.json";
export default function Header({ filterItem, setItem, menuItems, itemCounts }) {
    const [isOpen, setIsOpen] = useState(false);
    const [kindOpen, setKindOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(getSelectedValueFromLocalStorage() || "Project");
    const [catagoryValue, setCatagoryValue] = useState("All");
    const [scroll, setScroll] = useState(false);
    let prevScroll = 0;
    let timer;
    let getAllCount = Data.main.length;

    //새로고침 시 LocalStorage 데이터 유지
    function saveSelectedValueToLocalStorage(value) {
        localStorage.setItem("selectedValue", value);
    }
    function getSelectedValueFromLocalStorage() {
        return localStorage.getItem("selectedValue");
    }

    function handleScroll() {
        if (timer) {
            clearTimeout(timer);
        }
        let mainScrollY = document.querySelector(".sub-section .list");
        const currScroll = mainScrollY.scrollTop;
        if (window.innerWidth <= 720) {
            if (prevScroll > currScroll) {
                timer = setTimeout(() => {
                    setScroll(false);
                }, 20);
            } else {
                timer = setTimeout(() => {
                    setScroll(true);
                }, 20);
            }
            prevScroll = currScroll;
        }
    }
    function reRender() {
        setTimeout(() => {
            let currentScrollY = document.querySelector(".sub-section .list");
            currentScrollY.addEventListener("scroll", function () {
                if (timer) {
                    clearTimeout(timer);
                }
                const currScroll = this.scrollTop;
                if (window.innerWidth <= 720) {
                    if (prevScroll > currScroll) {
                        timer = setTimeout(() => {
                            setScroll(false);
                        }, 20);
                    } else {
                        timer = setTimeout(() => {
                            setScroll(true);
                        }, 20);
                    }
                    prevScroll = currScroll;
                }
            });
        }, 25);
    }

    function handleTop(ms) {
        const catagorySelect = document.querySelectorAll(".select");
        let mainTop = document.querySelector(".sub-section .list");
        for (const catagorySelects of catagorySelect) {
            catagorySelects.addEventListener("click", function () {
                mainTop.scrollTo({ top: 0, behavior: "smooth" });

                let gnb = document.querySelector(".gnb");
                gnb.classList.remove("minimized");
            });
        }
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function process() {
        await handleTop(1000);
    }
    function projectClickHandler() {
        let gnb = document.querySelector(".gnb");
        let rowSel = document.querySelectorAll(".custom-sel");
        let selCount = rowSel.length;
        var windowWidth = window.innerWidth;

        if (windowWidth >= 720 && selCount === 2) {
            gnb.style.width = "480px";
        } else if (windowWidth >= 720 && selCount === 1) {
            gnb.style.width = "310px";
        } else if (windowWidth <= 720 && selCount === 2) {
            gnb.style.width = "330px";
        } else if (windowWidth <= 720 && selCount === 1) {
            gnb.style.width = "198px";
        } else {
            gnb.removeAttribute("style");
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const catagoryDropdown = () => {
        setKindOpen(!kindOpen);
    };
    const handleSelect = (value) => {
        setSelectedValue(value);
        saveSelectedValueToLocalStorage(value);
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
        projectClickHandler();

        window.addEventListener("click", handleCloseSelect);
        window.addEventListener("click", catagoryCloseSelect);
        window.addEventListener("resize", projectClickHandler);
    });

    useEffect(() => {
        let currentScrollY = document.querySelector(".sub-section .list");
        currentScrollY.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setScroll]);

    return (
        <header id="header" className="header" ref={el}>
            <div className={`gnb ${scroll ? "minimized" : ""}`}>
                <div className="row-sel">
                    <Link
                        to="/project"
                        className="name"
                        onClick={() => {
                            handleSelect("Project");
                            reRender();
                        }}
                    >
                        Wang
                    </Link>
                    <Wrapper>
                        <div className={`custom-sel ${isOpen ? "open" : ""}`}>
                            <button type="button" onClick={toggleDropdown}>
                                {selectedValue}
                            </button>
                            <ul className="list">
                                <li
                                    className="project"
                                    onClick={() => {
                                        handleSelect("Project");
                                        reRender();
                                    }}
                                >
                                    <Link to="/project">Project</Link>
                                </li>
                                <li className="career" onClick={() => handleSelect("Career")}>
                                    <Link to="/career">Career</Link>
                                </li>
                            </ul>
                        </div>
                    </Wrapper>
                    {selectedValue !== "Career" && (
                        <Wrapper>
                            <div className={`custom-sel ${kindOpen ? "open" : ""}`}>
                                <button type="button" onClick={catagoryDropdown}>
                                    {catagoryValue === "All" ? (
                                        <span>
                                            All<span className="count">{getAllCount}</span>
                                        </span>
                                    ) : (
                                        <span>
                                            {catagoryValue}
                                            <span className="count">{itemCounts[catagoryValue]}</span>
                                        </span>
                                    )}{" "}
                                </button>
                                <ul className="list">
                                    <li onClick={() => handleCatagory("All")} className="select">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setItem(Data.main);
                                                process();
                                            }}
                                        >
                                            <span>All</span>

                                            <span className="count">{getAllCount}</span>
                                        </button>
                                    </li>
                                    {menuItems.map((Val, id) => {
                                        return (
                                            <li onClick={() => handleCatagory(Val)} key={id} className="select">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        filterItem(Val);
                                                        process();
                                                    }}
                                                >
                                                    <span>{Val}</span>
                                                    <span className="count">{itemCounts[Val]}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </Wrapper>
                    )}
                </div>
            </div>
        </header>
    );
}
