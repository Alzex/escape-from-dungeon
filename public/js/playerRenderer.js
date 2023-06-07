/* eslint-disable no-undef */
const getTexture = (direction) => {
  switch (direction) {
    case 'up':
      return PIXI.Texture.from('assets/back1.png');
    case 'down':
      return PIXI.Texture.from('assets/front1.png');
    case 'left':
      return PIXI.Texture.from('assets/side2.png');
    case 'right':
      return PIXI.Texture.from('assets/side1.png');
  }
};

export default class PlayerRenderer {
  constructor(stage, cellSize) {
    this.stage = stage;
    this.sprite = new PIXI.Sprite(getTexture('right'));
    this.cellSize = cellSize;
  }

  init() {
    this.sprite.scale.set(0.1, 0.1);
    this.sprite.x = this.cellSize * 0.5;
    this.sprite.y = this.cellSize * 1.5;
    this.sprite.zIndex = 1;
    this.stage.addChild(this.sprite);
  }

  updateDirection(direction) {
    this.sprite.texture = getTexture(direction);
  }

  updatePosition(x, y) {
    this.sprite.x = this.cellSize * (0.5 + x);
    this.sprite.y = this.cellSize * (0.5 + y);
  }
}
