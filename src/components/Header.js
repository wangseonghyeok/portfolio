import React, { useState, useEffect, useRef, useCallback } from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';
import Data from '../data.json';

export default function Header({ filterItem, setItem, menuItems, itemCounts, scrollbar, scrollRef }) {
    // 드롭다운 상태
    const [isOpen, setIsOpen] = useState(false);
    const [kindOpen, setKindOpen] = useState(false);
    // 선택된 메뉴/카테고리 상태
    const [selectedValue, setSelectedValue] = useState(() => localStorage.getItem('selectedValue') || 'Project');
    const [categoryValue, setCategoryValue] = useState('All');
    // 헤더/스크롤 상태
    const [scroll, setScroll] = useState(false);
    const [isHeader, setHeader] = useState(false);

    // 내부 참조 및 타이머
    const timer = useRef(null);
    const prevScroll = useRef(0);
    const el = useRef(null);

    const getAllCount = Data.main.length;

    // 스크롤 이벤트 핸들러
    const onScroll = useCallback((status) => {
        const currScroll = status.offset.y;
        if (timer.current) clearTimeout(timer.current);

        if (window.innerWidth <= 720) {
            timer.current = setTimeout(() => {
                setScroll(prevScroll.current > currScroll ? false : true);
            }, 20);
        } else {
            setHeader(prevScroll.current > currScroll);
        }
        prevScroll.current = currScroll;
    }, []);

    // 외부 클릭 시 드롭다운 닫기
    const handleClickOutside = useCallback(
        (e) => {
            if (isOpen && el.current && !el.current.contains(e.target)) setIsOpen(false);
            if (kindOpen && el.current && !el.current.contains(e.target)) setKindOpen(false);
        },
        [isOpen, kindOpen]
    );

    // 선택값 localStorage 저장
    const saveSelectedValueToLocalStorage = (value) => {
        localStorage.setItem('selectedValue', value);
    };

    // 메뉴 선택 처리
    const handleSelect = (value) => {
        setSelectedValue(value);
        saveSelectedValueToLocalStorage(value);
        setIsOpen(false);
    };

    // 카테고리 선택 처리
    const handleCategory = (value) => {
        setCategoryValue(value);
        setKindOpen(false);
    };

    // 메뉴 드롭다운 토글
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        if (kindOpen) setKindOpen(false);
    };

    // 카테고리 드롭다운 토글
    const categoryDropdown = () => {
        setKindOpen((prev) => !prev);
        if (isOpen) setIsOpen(false);
    };

    // 화면 높이 CSS 변수 동기화
    const syncHeight = useCallback(() => {
        document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
    }, []);

    // gnb 너비 조정
    const projectClickHandler = useCallback(() => {
        const gnb = document.querySelector('.gnb');
        if (!gnb) return;

        // Career에서 로고 클릭 시에도 480px로 강제 지정
        if (selectedValue === 'Project') {
            gnb.style.width = '480px';
            return;
        }
        const rowSel = document.querySelectorAll('.custom-sel');
        const selCount = rowSel.length;
        const windowWidth = window.innerWidth;

        if (windowWidth >= 720 && selCount === 2) {
            gnb.style.width = '480px';
        } else if (windowWidth >= 720 && selCount === 1) {
            gnb.style.width = '310px';
        } else if (windowWidth < 720 && selCount === 2) {
            gnb.style.width = '330px';
        } else if (windowWidth < 720 && selCount === 1) {
            gnb.style.width = '198px';
        } else {
            gnb.removeAttribute('style');
        }
    }, [selectedValue]);

    // 필터/카테고리 선택 시 리스트 상단으로 스크롤
    const process = useCallback(() => {
        if (scrollRef && scrollRef.current && scrollRef.current.scrollbar) {
            scrollRef.current.scrollbar.scrollTo(0, 0, 600);
        } else {
            const mainTop = document.querySelector('.sub-section .list');
            if (mainTop) mainTop.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [scrollRef]);

    // 스크롤바 이벤트 등록/해제
    useEffect(() => {
        if (!scrollbar) return;
        scrollbar.addListener(onScroll);
        return () => {
            if (scrollbar) scrollbar.removeListener(onScroll);
            if (timer.current) clearTimeout(timer.current);
        };
    }, [scrollbar, onScroll]);

    // window 이벤트 및 DOM 이벤트 관리
    useEffect(() => {
        syncHeight();
        projectClickHandler();

        window.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', () => {
            projectClickHandler();
            syncHeight();
        });

        const currentScrollY = document.querySelector('.sub-section .scroll-content');
        if (currentScrollY) currentScrollY.addEventListener('scroll', () => {});

        // cleanup
        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('resize', () => {
                projectClickHandler();
                syncHeight();
            });
            if (currentScrollY) currentScrollY.removeEventListener('scroll', () => {});
        };
    }, [handleClickOutside, projectClickHandler, syncHeight]);

    return (
        <header id="header" className={`header ${isHeader ? 'has-transform' : ''}`} ref={el}>
            <div className={`gnb ${scroll ? 'minimized' : ''}`}>
                <div className="row-sel">
                    {/* 메인 네임 클릭 시 Project 선택 및 상단 스크롤 */}
                    <Link
                        to="/project"
                        className="name"
                        onClick={() => {
                            handleSelect('Project');
                            process();
                            projectClickHandler();
                        }}
                    >
                        Wang
                    </Link>

                    {/* 메뉴 드롭다운 (애니메이션 Wrapper 제거!) */}
                    <div className={`custom-sel ${isOpen ? 'open' : ''}`}>
                        <button type="button" onClick={toggleDropdown}>
                            {selectedValue}
                        </button>
                        <ul className="list">
                            <li
                                className="project"
                                onClick={() => {
                                    handleSelect('Project');
                                    process();
                                }}
                            >
                                <Link to="/project">Project</Link>
                            </li>
                            <li
                                className="career"
                                onClick={() => {
                                    handleSelect('Career');
                                    process();
                                }}
                            >
                                <Link to="/career">Career</Link>
                            </li>
                        </ul>
                    </div>

                    {/* 카테고리 드롭다운 (애니메이션 유지) */}
                    {selectedValue !== 'Career' && (
                        <Wrapper>
                            <div className={`custom-sel ${kindOpen ? 'open' : ''}`}>
                                <button type="button" onClick={categoryDropdown}>
                                    {categoryValue === 'All' ? (
                                        <span>
                                            All<span className="count">{getAllCount}</span>
                                        </span>
                                    ) : (
                                        <span>
                                            {categoryValue}
                                            <span className="count">{itemCounts[categoryValue]}</span>
                                        </span>
                                    )}
                                </button>
                                <ul className="list">
                                    <li onClick={() => handleCategory('All')} className="select">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setItem(Data.main);
                                                process();
                                            }}
                                        >
                                            <span>All</span>
                                            <span className="count">{getAllCount}</span>
                                        </button>
                                    </li>
                                    {menuItems.map((Val) => (
                                        <li key={Val} onClick={() => handleCategory(Val)} className="select">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    filterItem(Val);
                                                    process();
                                                }}
                                            >
                                                <span>{Val}</span>
                                                <span className="count">{itemCounts[Val]}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Wrapper>
                    )}
                </div>
            </div>
        </header>
    );
}
