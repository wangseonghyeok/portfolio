import "./css/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/project" element={<Main />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
