import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Career from "./components/Career";
import Data from "./data.json";

function App() {
  const [item, setItem] = useState(Data.main);
  const menuItems = [...new Set(Data.main.map((Val) => Val.category))];
  const filterItem = (curcat) => {
    const newItem = Data.main.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };
  const visibleItems = Data.main.filter((item) => item.isVisible);
  const getElCount = visibleItems.map((Val) => Val.category);
  const itemCounts = {};
  menuItems.forEach((category) => {
    const count = getElCount.filter((item) => item.includes(category)).length;
    itemCounts[category] = count;
  });
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header filterItem={filterItem} setItem={setItem} menuItems={menuItems} itemCounts={itemCounts} />
        <Routes>
          <Route path="/" element={<Main item={item} />} />
          <Route path="/project" element={<Main item={item} />} />
          <Route path="/career" element={<Career />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
