import "./css/style.css";
import Header from "./components/Header";
import Records from "./records.json";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="App">
                <main>
                    <section className="main-section">
                        <div className="sub-section">
                            <div className="portfolio-list grid">
                                {[...Records].reverse().map((record) => {
                                    return record.isVisible ? (
                                        <div className="pf-list-item" key={record.id}>
                                            <div className="pf-list-inner">
                                                <a href={record.link} target="_blank" className="pf-img" rel="noreferrer">
                                                    <img src={record.img} alt="img"></img>
                                                </a>
                                                <div className="pf-info">
                                                    <div className="pf-info-bottom">
                                                        <div className="project-skill">
                                                            {record.skile.map((name, index) => {
                                                                return (
                                                                    <span key={record.id + index + 1}>
                                                                        {index ? "" : ""} {name}
                                                                    </span>
                                                                );
                                                            })}{" "}
                                                        </div>
                                                        <p className="project-name">{record.title}</p>
                                                        <p className="project-info">
                                                            <span className="info-vlaue">{record.brand} /</span>
                                                            <span className="info-vlaue"> {record.data} /</span>
                                                            <span className="info-vlaue"> {record.kind}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
