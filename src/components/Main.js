import React, { useEffect, useState } from "react";

export default function Main({ item }) {
    const [isMobile, setisMobile] = useState(true);
    const resizingHandler = () => {
        if (window.innerWidth <= 720) {
            setisMobile(false);
        } else {
            setisMobile(true);

            let gnb = document.querySelector(".gnb");
            gnb.classList.remove("minimized");
        }
    };
    useEffect(() => {
        function syncHeight() {
            document.documentElement.style.setProperty("--window-inner-height", `${window.innerHeight}px`);
        }
        window.addEventListener("resize", resizingHandler);
        window.addEventListener("resize", syncHeight);
        const mediaQuery = window.matchMedia("screen and (max-width: 720px)");
        let grid = document.querySelector(".portfolio-list");

        if (mediaQuery.matches) {
            grid.classList.remove("grid");
            setisMobile(false);
            syncHeight();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);
    return (
        <>
            <main>
                <section className="main-section">
                    <div className="sub-section">
                        <div className={`portfolio-list ${isMobile ? "grid" : ""}`}>
                            {[...item].reverse().map((Val) => {
                                return Val.isVisible ? (
                                    <div className="pf-list-item" key={Val.id}>
                                        <div className="pf-list-inner">
                                            <a href={Val.link} target="_blank" className="pf-img" rel="noreferrer">
                                                <img src={Val.img} alt="img"></img>
                                            </a>
                                            <div className="pf-info">
                                                <div className="pf-info-bottom">
                                                    <div className="project-skill">
                                                        {Val.skile.map((name, index) => {
                                                            return (
                                                                <span key={Val.id + index + 1}>
                                                                    {index ? "" : ""} {name}
                                                                </span>
                                                            );
                                                        })}{" "}
                                                    </div>
                                                    <p className="project-name">{Val.title}</p>
                                                    <p className="project-info">
                                                        <span className="info-vlaue">{Val.brand} /</span>
                                                        <span className="info-vlaue"> {Val.data} /</span>
                                                        <span className="info-vlaue"> {Val.kind}</span>
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
