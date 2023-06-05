const socket = io();
const generateButton = document.getElementById('generate');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

let app = new PIXI.Application({ width: 800, height: 800 });
document.body.appendChild(app.view);

// Create the sprite and add it to the stage
let wallTexture = PIXI.Texture.from('./assets/wall6.png');
let spaceTexture = PIXI.Texture.from('./assets/space.png');



generateButton.onclick = () => {
  app.stage.removeChildren();

  const width = parseInt(widthInput.value, 10);
  const height = parseInt(heightInput.value, 10);

  if (isNaN(width) || isNaN(height) || width < 5 || height < 5 || width > 12 || height > 12 || width !== height) {
    alert('Incorrect data');
    return;
  }

  socket.emit('generate', { width, height });

  socket.on('generationResult', ({ maze }) => {
    let cellSize = 30;
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        let cellTexture = maze[y][x] ? wallTexture : spaceTexture;
        let cellSprite = new PIXI.Sprite(cellTexture);
        cellSprite.scale.set(0.2, 0.2);

        // Position the sprite
        cellSprite.x = x * cellSize;
        cellSprite.y = y * cellSize;

        // Add the sprite to the app
        app.stage.addChild(cellSprite);
      }
    }
  });
};

document.body.appendChild(app.view);