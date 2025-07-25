import React, { useState, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Data from './data.json';
import Router from './Router';
import './assets/scss/style.scss';

// 앱의 루트 컴포넌트
function App() {
    // 스크롤바 제어용 ref (자식 컴포넌트에 전달)
    const scrollRef = useRef(null);
    // 현재 보여줄 아이템 리스트 상태
    const [item, setItem] = useState(Data.main);

    return (
        // 라우터 설정 (PUBLIC_URL 기준)
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                {/* 라우터 및 페이지 렌더링, 스크롤 ref 전달 */}
                <Router item={item} setItem={setItem} scrollRef={scrollRef} />
                {/* 하단 푸터 */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
