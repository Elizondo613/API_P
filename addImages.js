const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Image = require('./models/Image');
require('dotenv').config();

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Función para añadir imágenes de la carpeta 'uploads'
const addImagesToDB = async () => {
  const uploadDir = path.join(__dirname, 'uploads');
  
  fs.readdir(uploadDir, async (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de uploads:', err);
      return;
    }
    
    for (const file of files) {
      const filePath = `/uploads/${file}`;
      
      const newImage = new Image({
        filename: file,
        path: filePath
      });
      
      await newImage.save();
      console.log(`Imagen añadida: ${file}`);
    }

    console.log('Todas las imágenes han sido añadidas.');
    mongoose.connection.close();
  });
};

addImagesToDB();
