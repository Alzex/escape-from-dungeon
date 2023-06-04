import MazeGenerator from './classes/mazeGenerator.js';

const mazeGenerator = new MazeGenerator(10, 10);

console.log(
  mazeGenerator
    .generate()
    .map((row) => row.map((dat) => (dat ? '*' : ' ')).join(''))
    .join('\n'),
);
