export function calculatePossibleMoves(x, y) {
  const possibleCells = [];

  // prettier-ignore
  const directions = [
    [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2],
    [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2],
    [0, -2],  [0, -1],           [0, 1],  [0, 2],
    [1, -2],  [1, -1],  [1, 0],  [1, 1],  [1, 2],
    [2, -2],  [2, -1],  [2, 0],  [2, 1],  [2, 2]
  ];

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newY >= 0) {
      possibleCells.push([newX, newY]);
    }
  });

  return possibleCells;
}

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
