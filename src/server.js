import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import MazeGenerator from './classes/mazeGenerator.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('generate', ({ width, height }) => {
    if (!width || !height) return;
    const mazeGenerator = new MazeGenerator(width, height);

    socket.emit('generationResult', {
      maze: mazeGenerator.generate(),
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
