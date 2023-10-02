import { Link } from "react-router-dom";
export default function Header() {
    // 모든 요소에 대해 작업하기 위해 선택자로 해당 클래스의 모든 요소를 가져옵니다.
    const customSelects = document.querySelectorAll(".custom-sel");

    // 각 요소에 대한 루프를 실행합니다.
    customSelects.forEach(function (selWrap) {
        const selBtn = selWrap.querySelector("button");
        const selLayer = selWrap.querySelector("ul");
        const selResult = selWrap.querySelector("input");

        selBtn.addEventListener("click", function () {
            if (selWrap.classList.contains("open")) {
                selWrap.classList.toggle("open");
                toggleSlide(selLayer);
            } else {
                // 모든 .custom-sel 요소의 'open' 클래스를 제거하고 그 하위 ul 요소를 닫습니다.
                customSelects.forEach(function (item) {
                    item.classList.remove("open");
                    toggleSlide(item.querySelector("ul"));
                });

                selWrap.classList.add("open");
                toggleSlide(selLayer);
            }
        });

        // 각 li 요소에 대한 루프를 실행합니다.
        selLayer.querySelectorAll("li").forEach(function (li) {
            li.addEventListener("click", function () {
                li.classList.add("selected");

                // 선택된 항목을 제외한 다른 항목들의 'selected' 클래스를 제거합니다.
                selLayer.querySelectorAll("li:not(.selected)").forEach(function (otherLi) {
                    otherLi.classList.remove("selected");
                });

                selResult.value = li.getAttribute("data-value");
                selBtn.textContent = li.textContent;
                selWrap.classList.remove("open");
                toggleSlide(selLayer);
            });
        });
    });

    // 슬라이드 업 또는 다운 함수를 정의합니다.
    function toggleSlide(element) {
        const computedStyle = getComputedStyle(element);

        if (computedStyle.display === "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
    return (
        <>
            <header id="header" className="header">
                <gnb className="gnb">
                    <Link to="/project">Wang.</Link>
                    <div className="row-sel">
                        <div className="custom-sel">
                            <input type="text"></input>
                            <button type="button">project</button>
                        </div>
                    </div>
                </gnb>
            </header>
        </>
    );
}
