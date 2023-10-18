import Wrapper from "../components/Wrapper";
import React, { useEffect, useState } from "react";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <main>
        <div className="list"></div>
      </main>
    </Wrapper>
  );
}
