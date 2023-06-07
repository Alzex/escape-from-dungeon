/* eslint-disable no-undef */
import PlayerRenderer from './js/playerRenderer.js';
import MazeRenderer from './js/mazeRenderer.js';
import PathRenderer from './js/pathRenderer.js';

const generateButton = document.getElementById('generate');
const helpButton = document.getElementById('help');
const levelInput = document.getElementById('level');
const wrapper = document.getElementById('wrapper');

const CELL_SIZE = 30;

const socket = io();
const app = new PIXI.Application({
  backgroundAlpha: 0,
});

wrapper.appendChild(app.view);

const mazeRenderer = new MazeRenderer(app.stage, CELL_SIZE);
const playerRenderer = new PlayerRenderer(app.stage, CELL_SIZE);

generateButton.onclick = () => {
  app.stage.removeChildren();
  socket.removeAllListeners();
  helpButton.disabled = false;

  const level = parseInt(levelInput.value, 10);

  if (isNaN(level) || level < 5 || level > 12) {
    alert('Incorrect data');
    return;
  }

  socket.on('generationResult', ({ maze, controller }) => {
    app.renderer.resize(
      (maze.length + 1) * CELL_SIZE,
      (maze[0].length + 1) * CELL_SIZE,
    );
    mazeRenderer.render(maze);
    playerRenderer.init(controller);
  });

  socket.on('playerMove', ({ x, y, isWin }) => {
    if (!x || !y) return;
    playerRenderer.updatePosition(x, y);
    if (isWin) {
      alert('You win!');
      generateButton.click();
    }
  });

  socket.emit('generate', { width: level, height: level });
};

helpButton.onclick = () => {
  const pathRenderer = new PathRenderer(app.stage, CELL_SIZE);
  socket.removeAllListeners('helpResult');

  socket.on('helpResult', ({ path }) => {
    pathRenderer.render(path);
  });

  socket.emit('help');
};

document.body.onkeydown = (e) => {
  if (e.repeat) return;

  if (e.key === 'Enter') {
    generateButton.click();
    return;
  }
  if (e.key === 'ArrowUp' || e.key === 'w') {
    socket.emit('move', { direction: 'up' });
    playerRenderer.updateDirection('up');
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    socket.emit('move', { direction: 'down' });
    playerRenderer.updateDirection('down');
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    socket.emit('move', { direction: 'left' });
    playerRenderer.updateDirection('left');
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    socket.emit('move', { direction: 'right' });
    playerRenderer.updateDirection('right');
  }
};
