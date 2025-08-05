const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const bookRoutes = require('./routes/BookRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// 404 fallback
app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
