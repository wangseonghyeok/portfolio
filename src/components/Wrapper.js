import React from "react";
import { motion } from "framer-motion";
import { pageEffect } from "./style/animation";

const Wrapper = ({ children }) => {
    return (
        <motion.div initial="initial" animate="in" exit="out" transition={{ duration: 0.5 }} variants={pageEffect}>
            {React.Children.map(children, (child) => {
                // 각 자식 컴포넌트의 id 속성을 key로 사용
                console.log(children);
                return React.cloneElement(child, { key: child.props.id });
            })}
        </motion.div>
    );
};

export default Wrapper;
