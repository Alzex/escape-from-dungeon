import MazeGenerator from './classes/mazeGenerator.js';
import MazeSolver from './classes/pathFinder.js';

const mazeGenerator = new MazeGenerator(10, 10);

const maze = mazeGenerator.generate();

console.log(
  maze.map((row) => row.map((dat) => (dat ? '█' : ' ')).join('')).join('\n'),
);

const solver = new MazeSolver(maze);

solver.solve();

console.log(
  solver
    .getPath()
    .map((cell) => `(${cell.x}, ${cell.y})`)
    .join(' -> '),
);
