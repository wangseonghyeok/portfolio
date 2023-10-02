import Records from "../records.json";
import React, { useEffect, useState } from "react";

export default function Main() {
    const [isMobile, setisMobile] = useState(true);
    let grid = document.querySelector(".portfolio-list");
    const resizingHandler = () => {
        if (window.innerWidth <= 720) {
            setisMobile(true);
            grid.classList.remove("grid");
        } else {
            setisMobile(false);
            grid.classList.add("grid");
        }
    };
    useEffect(() => {
        window.addEventListener("resize", resizingHandler);
        const mediaQuery = window.matchMedia("screen and (max-width: 720px)");
        let grid = document.querySelector(".portfolio-list");
        if (mediaQuery.matches) {
            grid.classList.remove("grid");
            setisMobile(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);
    return (
        <>
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
        </>
    );
}
