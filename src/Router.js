import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Career from './components/Career';
import Data from './data.json';

// 라우터 및 상단 헤더/메인/커리어 페이지 관리 컴포넌트
export default function Router({ item, setItem, scrollRef }) {
    const location = useLocation(); // 현재 라우터 위치

    // 카테고리 목록 추출 (중복 제거)
    const menuItems = [...new Set(Data.main.map((Val) => Val.category))];

    // 카테고리별 필터 함수
    const filterItem = (category) => {
        const newItems = Data.main.filter((item) => item.category === category);
        setItem(newItems);
    };

    // 각 카테고리별 아이템 개수 계산
    const visibleItems = Data.main.filter((item) => item.isVisible);
    const getElCount = visibleItems.map((Val) => Val.category);
    const itemCounts = {};
    menuItems.forEach((category) => {
        const count = getElCount.filter((item) => item.includes(category)).length;
        itemCounts[category] = count;
    });

    return (
        <>
            {/* 헤더에 필터/카테고리/스크롤 참조 등 전달 */}
            <Header filterItem={filterItem} setItem={setItem} menuItems={menuItems} itemCounts={itemCounts} scrollRef={scrollRef} />
            {/* 라우터 경로별 페이지 렌더링 */}
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Main item={item} scrollRef={scrollRef} />} />
                <Route path="/project" element={<Main item={item} scrollRef={scrollRef} />} />
                <Route path="/career" element={<Career />} />
            </Routes>
        </>
    );
}
