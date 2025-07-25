import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { AnimatePresence, motion } from 'framer-motion';
import Scrollbar from 'smooth-scrollbar';

// 자동 닫힘 알림 컴포넌트
function AutoDismissAlert({ message, duration, onClose }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

    // 화면 크기 변경 시 모바일 여부 갱신
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 720);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // duration 후 알림 닫기
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // 알림 스타일
    const alertStyles = {
        position: 'fixed',
        top: '110px',
        left: '50%',
        textAlign: 'center',
        transform: 'translateX(-50%)',
        width: isMobile ? '80%' : 'auto',
        padding: '10px 20px',
        fontSize: '16px',
        lineHeight: '19px',
        wordBreak: 'keep-all',
        backgroundColor: '#f44336',
        color: '#fff',
        borderRadius: '30px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    };

    return <div style={alertStyles}>{message}</div>;
}

export default function Main({ item, scrollRef }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
    const [alertMessage, setAlertMessage] = useState(null);

    // 화면 크기 변경 시 모바일 여부 갱신
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 720);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 빈 링크 클릭 시 알림 표시
    const preventEmptyHref = (e, href) => {
        if (!href) {
            e.preventDefault();
            setAlertMessage('보안상의 사유로 해당 자료를 공개하기 어려운 점 양해 부탁드립니다.');
        }
    };

    // 스크롤바 초기화 (ref는 .sub-section에만!)
    useEffect(() => {
        let instance;
        if (scrollRef.current) {
            // 기존 인스턴스가 있으면 제거
            if (scrollRef.current.scrollbar) {
                scrollRef.current.scrollbar.destroy();
            }
            // 스크롤바 새로 생성
            instance = Scrollbar.init(scrollRef.current, {
                damping: 0.1,
            });
            scrollRef.current.scrollbar = instance;
        }
        // 언마운트 시 스크롤바 제거
        return () => {
            if (instance) instance.destroy();
        };
    }, [scrollRef]);

    return (
        <Wrapper>
            <main>
                <section className="main-section">
                    {/* 스크롤바 적용 영역 */}
                    <div className="sub-section" ref={scrollRef}>
                        {/* 리스트 영역, 720px 이상일 때 grid 클래스 추가 */}
                        <div className={`list ${!isMobile ? 'grid' : ''}`}>
                            {item.length === 0 ? (
                                // 데이터 없을 때 메시지
                                <div className="empty-list">데이터가 없습니다.</div>
                            ) : (
                                // 리스트 애니메이션 처리
                                <AnimatePresence mode="popLayout">
                                    {[...item].reverse().map((Val) =>
                                        Val.isVisible ? (
                                            <motion.div
                                                className="pf-list-item"
                                                key={Val.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -30 }}
                                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                            >
                                                <div className="pf-list-inner">
                                                    <a href={Val.link} target="_blank" className="pf-img" rel="noreferrer" onClick={(e) => preventEmptyHref(e, Val.link)}>
                                                        <img src={require(`../assets/images/${Val.img}`)} alt="img" />
                                                    </a>
                                                    <div className="pf-info">
                                                        <div className="pf-info-bottom">
                                                            <div className="project-skill">
                                                                {Val.skile.map((name, index) => (
                                                                    <span key={Val.id + index + 1}>{name}</span>
                                                                ))}
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
                                            </motion.div>
                                        ) : null
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </section>
                {/* 알림 메시지 표시 */}
                {alertMessage && <AutoDismissAlert message={alertMessage} duration={3000} onClose={() => setAlertMessage(null)} />}
            </main>
        </Wrapper>
    );
}
