import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Data from "../data.json";
export default function Header({ filterItem, setItem, menuItems, itemCounts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kindOpen, setKindOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Project"); // 선택된 값을 관리
  const [catagoryValue, setCatagoryValue] = useState("All");
  const [scroll, setScroll] = useState(false);
  let prevScroll = 0;
  let timer;
  function handleScroll() {
    // console.log(e);
    // e.preventDefault();
    // let currentScrollY = document.querySelector(".portfolio-list").scrollY;
    // console.log(document.body.scrollHeight);
    // console.log(currentScrollY);
    // if (window.innerWidth <= 720) {
    //     console.log(e.deltaY);
    //     if (e.deltaY < 0) {
    //         console.log("up");
    //         setScroll(false);
    //     } else {
    //         setScroll(true);
    //         console.log("down");
    //     }
    // }

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const currScroll = this.scrollTop;
      if (window.innerWidth <= 720) {
        if (prevScroll > currScroll) {
          setScroll(false);
        } else {
          setScroll(true);
        }
        prevScroll = currScroll;
      }
    }, 20);

    // const currScroll = this.scrollTop;
    // if (window.innerWidth <= 720) {
    //     if (prevScroll > currScroll) {
    //         // setScroll(false);
    //         console.log("위");
    //     } else {
    //         // setScroll(true);
    //         console.log("아래");
    //     }
    //     prevScroll = currScroll;
    // }
  }
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

  useEffect(() => {
    let currentScrollY = document.querySelector(".portfolio-list");
    currentScrollY.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header id="header" className="header" ref={el}>
      <div className={`gnb ${scroll ? "minimized" : ""}`}>
        <div className="row-sel">
          <Link to="/project/" className="name">
            Wang
          </Link>
          <div className={`custom-sel ${isOpen ? "open" : ""}`}>
            <button type="button" onClick={toggleDropdown}>
              {selectedValue}
            </button>
            <ul className="list">
              <li onClick={() => handleSelect("Project")}>
                <Link to="/project/">Project</Link>
              </li>
              <li className="profile" onClick={() => handleSelect("Carrer")}>
                <Link to="/carrer/">Carrer</Link>
              </li>
            </ul>
          </div>
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
              <li onClick={() => handleCatagory("All")}>
                <button type="button" onClick={() => setItem(Data)}>
                  <span>All</span>
                  <span className="count">{getAllCount}</span>
                </button>
              </li>
              {menuItems.map((Val, id) => {
                return (
                  <li onClick={() => handleCatagory(Val)} key={id}>
                    <button type="button" onClick={() => filterItem(Val)}>
                      <span>{Val}</span>
                      <span className="count">{itemCounts[Val]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
