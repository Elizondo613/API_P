const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Image = require('./models/Image');
require('dotenv').config();

//Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

//Función para añadir solo imágenes nuevas de la carpeta 'uploads'
const addNewImagesToDB = async () => {
  const uploadDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadDir, async (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de uploads:', err);
      return;
    }

    for (const file of files) {
      const filePath = `/uploads/${file}`;

      //Verificar si la imagen ya existe en la base de datos
      const imageExists = await Image.findOne({ filename: file });

      if (!imageExists) {
        const newImage = new Image({
          filename: file,
          path: filePath
        });

        await newImage.save();
        console.log(`Imagen añadida: ${file}`);
      } else {
        console.log(`Imagen ya existe en la base de datos: ${file}`);
      }
    }

    console.log('Proceso completado.');
    mongoose.connection.close();
  });
};

addNewImagesToDB();