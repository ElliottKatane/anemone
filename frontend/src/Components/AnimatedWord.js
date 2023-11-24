import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const AnimatedWord = ({ word }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLetterIndex((prevIndex) =>
        prevIndex < word.length - 1 ? prevIndex + 1 : 0
      );
    }, 50); // Interval de 100 millisecondes pour la transition rapide

    return () => clearInterval(interval);
  }, [word]);

  return (
    <div>
      {word.split("").map((letter, index) => (
        <AnimatePresence key={index}>
          <motion.span
            key={index}
            initial={{ color: "black" }}
            animate={{
              color: index === currentLetterIndex ? "black" : "#1aac83",
            }}
            exit={{ color: "black" }}
          >
            {letter}
          </motion.span>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default AnimatedWord;
