export default class Controller {
  constructor(player) {
    this.player = player;
  }

  onClick(direction) {
    if (this.player.changeDirection(direction)) {
      this.player.checkCollision();
    }
  }
}
