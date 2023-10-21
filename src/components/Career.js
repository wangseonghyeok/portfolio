import Wrapper from "./Wrapper";
import React, { useEffect } from "react";
import Data from "../data.json";
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
            <main style={{ borderRadius: "0px" }}>
                <div className="content">
                    {Data.work.map((Val) => {
                        return (
                            <div className="list" key={Val.id}>
                                <div className="work">
                                    <h1>왕성혁 경력기술서</h1> <span>총 경력 3년</span>
                                </div>
                                <div className="career">
                                    <p className="company">
                                        ※ <strong>{Val.company}</strong> 주임 퍼블리셔
                                    </p>
                                    <p className="date">{Val.date}</p>
                                </div>
                                <p className="business">업무내용</p>
                                {Val.info.map((data) => {
                                    return (
                                        <div className="title-wrap" key={data.id}>
                                            <div className="title-bar">
                                                <p className="title">
                                                    {data.title}
                                                    <span> | 퍼블리싱 기여도 {data.percent}</span>
                                                </p>
                                                <p className="date">{data.date}</p>
                                            </div>
                                            <div className="desc">
                                                {/* {data.desc} */}
                                                {data.desc.map((name, index) => {
                                                    return <p key={Val.id + index + 1}>{name}</p>;
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </main>
        </Wrapper>
    );
}
