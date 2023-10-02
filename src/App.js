import "./css/style.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Main />
            </div>
        </BrowserRouter>
    );
}

export default App;
