import MazeGenerator from '../src/classes/mazeGenerator.js';
import { PathFinder } from '../src/classes/pathFinder.js';

describe('Maze Test', () => {
  let maze, pathFinder;

  beforeEach(() => {
    maze = new MazeGenerator(10, 10);
    maze.generate();
    pathFinder = new PathFinder(maze);
  });

  describe('Maze Generator', () => {
    test('should generate a maze', () => {
      expect(maze.generate()).toBeTruthy();
    });
  });

  describe('Path Finder', () => {
    test('should find a path', () => {
      expect(pathFinder.aStarSearch()).toBeTruthy();
    });
  });
});
