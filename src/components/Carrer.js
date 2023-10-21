import Wrapper from "../components/Wrapper";
import React, { useEffect } from "react";
export default function Carrer() {
    useEffect(() => {
        function syncHeight() {
            document.documentElement.style.setProperty("--window-inner-height", `${window.innerHeight}px`);
        }

        window.addEventListener("resize", syncHeight);
        const mediaQuery = window.matchMedia("screen and (max-width: 720px)");

        if (mediaQuery.matches) {
            syncHeight();
        }
    }, []);
    return (
        <Wrapper>
            <main>
                <div className="list"></div>
            </main>
        </Wrapper>
    );
}
