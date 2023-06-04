export default class Maze {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    this.maze = Array(height * 2 + 1)
      .fill(0)
      .map(() => Array(width * 2 + 1).fill(true));

    this.stack = [{ x: 1, y: 1 }];
  }

  isInsideMaze(x, y) {
    return x > 0 && y > 0 && x < this.width * 2 && y < this.height * 2;
  }

  getNeighbors(x, y) {
    let result = [];

    const potentialNeighbors = [
      { x: x - 2, y: y, wall: { x: x - 1, y: y } },
      { x: x + 2, y: y, wall: { x: x + 1, y: y } },
      { x: x, y: y - 2, wall: { x: x, y: y - 1 } },
      { x: x, y: y + 2, wall: { x: x, y: y + 1 } },
    ];

    potentialNeighbors.forEach((neighbor) => {
      if (
        this.isInsideMaze(neighbor.x, neighbor.y) &&
        this.maze[neighbor.x][neighbor.y]
      ) {
        result.push(neighbor);
      }
    });

    return result;
  }

  generate() {
    while (this.stack.length > 0) {
      let currentCell = this.stack[this.stack.length - 1];
      this.maze[currentCell.x][currentCell.y] = false;

      let neighbors = this.getNeighbors(currentCell.x, currentCell.y);

      if (neighbors.length > 0) {
        let randNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        this.maze[randNeighbor.wall.x][randNeighbor.wall.y] = false;

        this.stack.push(randNeighbor);
      } else {
        this.stack.pop();
      }
    }
  }
}
