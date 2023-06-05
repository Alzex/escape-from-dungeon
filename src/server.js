import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

io.on('connection', () => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
