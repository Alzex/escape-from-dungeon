import MazeGenerator from '../src/classes/mazeGenerator.js';
import MazeSolver from '../src/classes/pathFinder.js';

describe('Maze Test', () => {
  let maze, solver;

  beforeEach(() => {
    maze = new MazeGenerator(10, 10);
    solver = new MazeSolver(maze.generate());
  });

  describe('Maze Generator', () => {
    test('should generate a maze', () => {
      expect(maze.generate()).toBeTruthy();
    });
  });

  describe('Path Finder', () => {
    test('should find a path', () => {
      expect(solver.solve()).toBeTruthy();
    });
  });
});
