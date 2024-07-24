export const isValidPosition = (x, y, maxX, maxY) =>
  x >= 0 && x <= maxX && y >= 0 && y <= maxY;

const leftTurn = { N: 'W', W: 'S', S: 'E', E: 'N' };
const rightTurn = { N: 'E', E: 'S', S: 'W', W: 'N' };

const moveForward = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

export const executeCommands = (
  x,
  y,
  orientation,
  commands,
  plateauMaxX,
  plateauMaxY,
) => {
  const path = [[x, y]];
  commands.split('').forEach((command) => {
    if (command === 'L') {
      orientation = leftTurn[orientation];
    } else if (command === 'R') {
      orientation = rightTurn[orientation];
    } else if (command === 'M') {
      const [dx, dy] = moveForward[orientation];
      const newX = x + dx;
      const newY = y + dy;
      if (isValidPosition(newX, newY, plateauMaxX, plateauMaxY)) {
        x = newX;
        y = newY;
        path.push([x, y]);
      }
    }
  });
  return path;
};
