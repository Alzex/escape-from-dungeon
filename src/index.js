import Maze from './classes/mazeGenerator.js';

const maze = new Maze(10, 10);

maze.generate();

console.log(maze.maze);
