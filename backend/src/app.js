const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const taskRoutes = require('./routes/taskRoutes');
const eventRoutes = require('./routes/eventRoutes');
const imageRoutes = require('./routes/imageRoutes');

const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundMiddleware');

const allowedOrigins = [
    'http://localhost:5173',
    'https://tfm-alpha.vercel.app'
];

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Servidor backend desplegado correctamente');
});

app.use('/', authRoutes);
app.use('/email', emailRoutes);
app.use('/tasks', taskRoutes);     
app.use('/events', eventRoutes); 
app.use('/images', imageRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

