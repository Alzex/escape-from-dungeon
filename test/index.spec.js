import MazeGenerator from '../src/classes/mazeGenerator.js';
import MazeSolver from '../src/classes/pathFinder.js';

describe('Maze Test', () => {
  let labyrinth, solver;

  beforeEach(() => {
    labyrinth = new MazeGenerator(10, 10);
    solver = new MazeSolver(labyrinth.generate());
  });

  describe('Maze Generator', () => {
    test('should generate a maze', () => {
      expect(labyrinth.generate()).toBeTruthy();
    });
  });

  describe('Path Finder', () => {
    test('should find a path', () => {
      expect(solver.solve()).toBeTruthy();
    });
    test('should not find a path', () => {
      labyrinth.maze[1][1] = true;
      solver = new MazeSolver(labyrinth.maze);
      expect(solver.solve()).toBeFalsy();
    });
    test('should not find a path', () => {
      labyrinth.maze[labyrinth.maze.length - 2][
        labyrinth.maze[0].length - 1
      ] = true;
      solver = new MazeSolver(labyrinth.maze);
      expect(solver.solve()).toBeFalsy();
    });
  });
});
