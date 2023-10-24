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
                    <div className="work">
                        <h2>왕성혁 경력기술서</h2> <span>총 경력 3년</span>
                    </div>

                    {Data.work.map((Val) => {
                        return (
                            <div className="list" key={Val.id}>
                                <div className="career">
                                    <p className="company">
                                        ※ <strong>{Val.company}</strong> 주임 퍼블리셔
                                    </p>
                                    <p className="date">{Val.date}</p>
                                </div>
                                <p className="business">업무내용</p>
                                {[...Val.info].reverse().map((data) => {
                                    return (
                                        <div className="title-wrap" key={data.id}>
                                            <div className="title-bar">
                                                <p className="title">
                                                    {data.title}
                                                    <span> | 퍼블리싱 기여도 {data.percent}</span>
                                                </p>
                                                <p className="date">
                                                    <span></span>
                                                    <span>{data.date}</span>
                                                </p>
                                            </div>
                                            <div className="desc">
                                                {/* {data.desc} */}
                                                {data.desc.map((post, num) => {
                                                    return <p key={Val.id + num + 1}>- {post}</p>;
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
