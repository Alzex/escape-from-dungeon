export default class Player {
  constructor(maze) {
    this.x = 0;
    this.y = 1;
    this.maze = maze;
    this.direction = 'right';
  }

  changeDirection(newDirection) {
    if (this.direction === newDirection) return true;
    //change sprite direction (newDirection
  }

  checkCollision() {
    let nX, nY;
    switch (this.direction) {
      case 'up':
        nY = this.y - 1;
        break;
      case 'down':
        nY = this.y + 1;
        break;
      case 'left':
        nX = this.x - 1;
        break;
      case 'right':
        nX = this.x + 1;
        break;
    }
    if (this.maze[nX][nY] === 'false') this.move(nX, nY);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    return { x, y };
  }
}
