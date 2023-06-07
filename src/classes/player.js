export default class Player {
  constructor(maze) {
    this.x = 0;
    this.y = 1;
    this.maze = maze;
  }
  checkCollision(direction) {
    let nX = this.x;
    let nY = this.y;
    switch (direction) {
      case 'up':
        nY -= 1;
        break;
      case 'down':
        nY += 1;
        break;
      case 'left':
        nX -= 1;
        break;
      case 'right':
        nX += 1;
        break;
    }
    if (this.maze[nY][nX] === false) return { isMoveAllowed: true, nY, nX };
    return false;
  }

  #checkWin() {
    if (this.y === this.maze.length - 2 && this.x === this.maze[0].length - 1)
      return true;
  }

  move(y, x) {
    this.y = y;
    this.x = x;

    const isWin = this.#checkWin();

    return { y, x, isWin };
  }
}
