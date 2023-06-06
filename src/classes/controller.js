export default class Controller {
  constructor(player) {
    this.player = player;
  }

  onClick(direction) {
    const { isMoveAllowed, nY, nX } = this.player.checkCollision(direction);
    if (isMoveAllowed) {
      return this.player.move(nY, nX);
    }
  }
}
