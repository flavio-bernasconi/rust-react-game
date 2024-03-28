import React from "react";
import { motion } from "framer-motion";
import { randomIntFromInterval } from "../utils";

export const Enemy = ({ position }) => {
  return (
    <motion.div
      animate={{
        y: [position.old[1] * 60, position.new[1] * 60],
        x: [position.old[0] * 60, position.new[0] * 60],
      }}
      style={{ position: "absolute", zIndex: 999 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from(Array(12).keys()).map((node) => {
        const randomPosX = randomIntFromInterval(5, 50);
        const randomPosY = randomIntFromInterval(5, 50);
        return (
          <div
            key={`${node}`}
            className="soldier enemy"
            style={{ top: randomPosY, left: randomPosX }}
          ></div>
        );
      })}
    </motion.div>
  );
};
