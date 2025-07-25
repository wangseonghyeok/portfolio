import { pageEffect } from './style/animation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// 페이지 전환 애니메이션 Wrapper 컴포넌트
const Wrapper = ({ children }) => {
    // 현재 라우터 위치 정보 가져오기
    const location = useLocation();

    return (
        // AnimatePresence: 페이지가 변경될 때 exit 애니메이션 적용
        <AnimatePresence mode="wait">
            {/* motion.div: 페이지 전환 애니메이션 적용 */}
            <motion.div
                key={location.pathname} // 경로가 바뀔 때마다 새로운 애니메이션 적용
                initial="initial" // 초기 상태
                animate="in" // 진입 애니메이션
                exit="out" // 종료 애니메이션
                transition={{ duration: 0.5 }} // 애니메이션 지속시간
                variants={pageEffect} // 애니메이션 효과 객체
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default Wrapper;
