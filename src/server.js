import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import MazeGenerator from './classes/mazeGenerator.js';
import Player from './classes/player.js';
import Controller from './classes/controller.js';
import MazeSolver from './classes/mazeSolver.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

io.on('connection', (socket) => {
  socket.on('generate', ({ width, height }) => {
    socket.removeAllListeners('move');
    socket.removeAllListeners('help');

    if (!width || !height) return;
    const mazeGenerator = new MazeGenerator(width, height);
    const player = new Player(mazeGenerator.maze);
    const controller = new Controller(player);

    socket.emit('generationResult', {
      maze: mazeGenerator.generate(),
    });

    socket.on('move', ({ direction }) => {
      const moveData = controller.onClick(direction) || {};
      socket.emit('playerMove', moveData);
    });

    socket.on('help', () => {
      const pathFinder = new MazeSolver(mazeGenerator.maze);
      pathFinder.solve();
      socket.emit('helpResult', {
        path: pathFinder.getPath(),
      });
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
