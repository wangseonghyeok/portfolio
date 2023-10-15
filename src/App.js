import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Carrer from "./components/Carrer";
import Data from "./data.json";

function App() {
    const [item, setItem] = useState(Data);
    const menuItems = [...new Set(Data.map((Val) => Val.category))];
    const filterItem = (curcat) => {
        const newItem = Data.filter((newVal) => {
            return newVal.category === curcat;
        });
        setItem(newItem);
    };

    const getElCount = Data.map((Val) => Val.category);
    const itemCounts = {};
    menuItems.forEach((category) => {
        const count = getElCount.filter((item) => item.includes(category)).length;
        itemCounts[category] = count;
    });
    return (
        <BrowserRouter>
            <div className="App">
                <Header filterItem={filterItem} setItem={setItem} menuItems={menuItems} itemCounts={itemCounts} />
                <Routes>
                    <Route path="/project" element={<Main item={item} />} />
                    <Route path="/carrer" element={<Carrer />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
