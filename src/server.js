require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = Number(process.env.PORT) || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH'],
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  socket.on('join-trip', (tripId) => {
    if (tripId) socket.join(`trip:${tripId}`);
  });
});

connectDB()
  .then(() =>
    server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  )
  .catch((err) => {
    console.error('Startup failed:', err.message);
    process.exit(1);
  });