export default class MazeSolver {
  constructor(maze) {
    this.maze = maze;
    this.start = { x: 1, y: 0 };
    this.goal = { x: maze.length - 2, y: maze[0].length - 1 };
    this.stack = [this.start];
    this.visited = maze.map((row) => row.map(() => false));
    this.predecessors = maze.map((row) => row.map(() => null));
    this.visited[this.start.x][this.start.y] = true;
  }

  isValid(x, y) {
    return x >= 0 && y >= 0 && x < this.maze.length && y < this.maze[0].length;
  }

  getNeighbors(x, y) {
    let result = [];
    const directions = [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
    ];
    directions.forEach((dir) => {
      if (
        this.isValid(dir.x, dir.y) &&
        !this.maze[dir.x][dir.y] &&
        !this.visited[dir.x][dir.y]
      ) {
        result.push(dir);
      }
    });
    return result;
  }

  solve() {
    while (this.stack.length > 0) {
      let currentCell = this.stack.pop();
      this.visited[currentCell.x][currentCell.y] = true;
      if (currentCell.x === this.goal.x && currentCell.y === this.goal.y) {
        console.log('Goal reached!');
        return true;
      }
      let neighbors = this.getNeighbors(currentCell.x, currentCell.y);
      neighbors.forEach((neighbor) => {
        this.stack.push(neighbor);
        this.predecessors[neighbor.x][neighbor.y] = currentCell;
      });
    }
    console.log('No path found');
    return false;
  }

  getPath() {
    let path = [];
    let currentCell = this.goal;
    while (currentCell) {
      path.push(currentCell);
      currentCell = this.predecessors[currentCell.x][currentCell.y];
    }
    return path.reverse();
  }
}
