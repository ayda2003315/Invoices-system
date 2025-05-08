const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const userRoutes = require('./routes/user.routes');
const scheduleTasks = require('./utils/scheduler');
const socketIO = require('socket.io');
const http = require('http');

dotenv.config();

const app = express(); // ✅ doit venir AVANT tout "app.use"
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connexion Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Planificateur
scheduleTasks(io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes); // ✅ Ta route est donc /api/invoices/upload

// Socket.io
io.on('connection', socket => {
  console.log('🟢 Socket connecté');
});

// Démarrer serveur
server.listen(3000, () => console.log('🚀 Serveur lancé sur le port 3000'));
