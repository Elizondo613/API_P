require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoUri = process.env.MONGO_URI;

app.use(cors());

app.use(express.json());

const imageRoutes = require('./routes/ImageRoutes');
app.use('/api', imageRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a MongoDB
mongoose.connect(mongoUri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB', err));

// Ruta básica
app.get('/', (req, res) => {
    res.send('Image API');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));