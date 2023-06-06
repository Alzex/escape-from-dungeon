/* eslint-disable no-undef */
export default class MazeRenderer {
  constructor(stage, cellSize) {
    this.stage = stage;
    this.cellSize = cellSize;
    this.cellTexture = PIXI.Texture.from('./assets/wall6.png');
  }

  render(maze) {
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        const cellTexture = maze[y][x] ? this.cellTexture : null;
        const cellSprite = new PIXI.Sprite(cellTexture);
        cellSprite.scale.set(0.2, 0.2);

        cellSprite.x = x * this.cellSize;
        cellSprite.y = y * this.cellSize;

        this.stage.addChild(cellSprite);
      }
    }
  }
}
