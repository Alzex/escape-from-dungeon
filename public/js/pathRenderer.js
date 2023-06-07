/* eslint-disable no-undef */
export default class PathRenderer {
  constructor(stage, cellSize) {
    this.stage = stage;
    this.cellSize = cellSize;
    this.pathTexture = PIXI.Texture.from('assets/flag.png');
  }

  render(path) {
    for (const point of path) {
      const { x, y } = point;
      const pathSprite = new PIXI.Sprite(this.pathTexture);
      pathSprite.scale.set(0.01);
      pathSprite.y = (0.7 + x) * this.cellSize;
      pathSprite.x = (0.7 + y) * this.cellSize;
      pathSprite.zIndex = 0;
      this.stage.addChild(pathSprite);
    }
    this.stage.sortChildren();
  }
}
