import React from "react";
import { motion } from "framer-motion";
import { randomIntFromInterval } from "../utils";

export const Hero = ({ position }) => {
  return (
    <motion.div
      animate={{
        y: [position.old[0] * 60, position.new[0] * 60],
        x: [position.old[1] * 60, position.new[1] * 60],
      }}
      style={{ position: "absolute", zIndex: 999 }}
      transition={{ duration: 1 }}
    >
      {Array.from(Array(12).keys()).map((node) => {
        const randomPosX = randomIntFromInterval(5, 50);
        const randomPosY = randomIntFromInterval(5, 50);
        return (
          <div
            key={`${node}`}
            className="hero"
            style={{ top: randomPosY, left: randomPosX }}
            transition={{
              loop: Infinity,
            }}
          ></div>
        );
      })}
    </motion.div>
  );
};
