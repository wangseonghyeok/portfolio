import React from "react";
import { motion } from "framer-motion";
import { pageEffect } from "./style/animation";
import { AnimatePresence } from "framer-motion";

const Wrapper = ({ children }) => {
  return (
    <AnimatePresence>
      <>
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} initial="initial" animate="in" exit="out" transition={{ duration: 0.5 }} variants={pageEffect}>
            {child}
          </motion.div>
        ))}
      </>
    </AnimatePresence>
  );
};

export default Wrapper;
