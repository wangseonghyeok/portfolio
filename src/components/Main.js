import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';

function AutoDismissAlert({ message, duration, onClose }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 720);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // 지정된 시간 후 닫힘 처리
        }, duration);

        return () => clearTimeout(timer); // 컴포넌트가 사라질 때 타이머 정리
    }, [duration, onClose]);

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

export default function Main({ item }) {
    const [isMobile, setisMobile] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);
    const resizingHandler = () => {
        if (window.innerWidth <= 720) {
            setisMobile(false);
        } else {
            setisMobile(true);

            let gnb = document.querySelector('.gnb');
            gnb.classList.remove('minimized');
        }
    };

    const preventEmptyHref = (e, href) => {
        if (!href) {
            e.preventDefault();
            setAlertMessage('보안상의 사유로 해당 자료를 공개하기 어려운 점 양해 부탁드립니다.');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizingHandler);

        const mediaQuery = window.matchMedia('screen and (max-width: 720px)');
        let grid = document.querySelector('.list');

        if (mediaQuery.matches) {
            grid.classList.remove('grid');
            setisMobile(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    return (
        <Wrapper>
            <main>
                <section className="main-section">
                    <div className="sub-section">
                        <div className={`list ${isMobile ? 'grid' : ''}`}>
                            <Wrapper>
                                {[...item].reverse().map((Val) => {
                                    return Val.isVisible ? (
                                        <div className="pf-list-item" key={Val.id}>
                                            <div className="pf-list-inner">
                                                <a href={Val.link} target="_blank" className="pf-img" rel="noreferrer" onClick={(e) => preventEmptyHref(e, Val.link)}>
                                                    <img src={Val.img} alt="img"></img>
                                                </a>
                                                <div className="pf-info">
                                                    <div className="pf-info-bottom">
                                                        <div className="project-skill">
                                                            {Val.skile.map((name, index) => {
                                                                return (
                                                                    <span key={Val.id + index + 1}>
                                                                        {index ? '' : ''} {name}
                                                                    </span>
                                                                );
                                                            })}{' '}
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
                            </Wrapper>
                        </div>
                    </div>
                </section>
                {alertMessage && <AutoDismissAlert message={alertMessage} duration={3000} onClose={() => setAlertMessage(null)} />}
            </main>
        </Wrapper>
    );
}
