import React, { useEffect, useState } from "react";
import { generate_map } from "rust-component";
import { Hero } from "./components/Hero";
import { Enemy } from "./components/Enemy";
import { calculatePossibleMoves } from "./utils";
import { motion } from "framer-motion";
import styled from "styled-components";

function App() {
  const initCharacterInitialPosition = [0, 0];
  const enemyInitialPosition = [3, 3];

  const [characterInitialPosition, setCharacterInitialPosition] = useState({
    old: initCharacterInitialPosition,
    new: initCharacterInitialPosition,
  });
  const [enemyPosition, setEnemyPosition] = useState({
    old: enemyInitialPosition,
    new: enemyInitialPosition,
  });
  const [grid, setGrid] = useState([]);
  const [possibleNextMoves, setPossibleNextMoves] = useState();

  useEffect(() => {
    setGrid(generate_map());
    setPossibleNextMoves(
      calculatePossibleMoves(
        initCharacterInitialPosition[0],
        initCharacterInitialPosition[1]
      )
    );
  }, []);

  if (!grid || !characterInitialPosition) return null;

  return (
    <div className="grid">
      <Hero position={characterInitialPosition} />
      <Enemy position={enemyPosition} />
      {grid.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((cell, j) => {
              const [x, y] = characterInitialPosition.new;
              const [enemyX, enemyY] = enemyInitialPosition;

              const isHero = x === j && y === i;
              const isEnemy = enemyX === j && enemyY === i;

              const isAPossibleMove = Boolean(
                possibleNextMoves?.filter(
                  (nextMovePositions) =>
                    nextMovePositions[0] === i &&
                    nextMovePositions[1] === j &&
                    cell === 1 &&
                    !isEnemy
                ).length
              );

              // console.log(`${i}-${j}`, { isAPossibleMove });

              return (
                <Cell
                  key={`${i}-${j}`}
                  className={`cell ${i}-${j} ${cell === 1 ? "land" : "water"} ${
                    isAPossibleMove ? "possible-move" : ""
                  } ${isHero ? "hero-cell" : ""} ${
                    isEnemy ? "enemy-cell" : ""
                  }`}
                  onClick={(e) => {
                    if (isEnemy || cell === 0 || !isAPossibleMove) return;
                    // const rect = e.target.getBoundingClientRect();
                    // const top = rect.top + window.pageYOffset;
                    // const left = rect.left + window.pageXOffset;

                    if (!isHero) {
                      const possibleCells = calculatePossibleMoves(i, j);
                      setPossibleNextMoves(possibleCells);
                    }

                    setCharacterInitialPosition((prev) => ({
                      old: prev.new,
                      new: [j, i],
                    }));
                  }}
                  color={cell === 1 ? "#d9ffce" : "#d5e7ff"}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const Cell = styled(motion.div)`
  /* background-color: ${({ color }) => color};
  &:before {
    border-bottom: 30px solid ${({ color }) => color};
  }
  &:after {
    border-top: 30px solid ${({ color }) => color};
  } */
`;

export default App;
