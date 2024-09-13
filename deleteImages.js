const mongoose = require('mongoose');
const Image = require('./models/Image');
require('dotenv').config();

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

//Función para eliminar imágenes por nombre de archivo
const deleteImagesFromDB = async () => {
  const imagesToDelete = ['default_bitmap_g432.png', 'default_bitmap_g433.png', 'default_bitmap_g932.png', 
    'default_bitmap_g1258.png', 'default_bitmap_g4059.png', 'default_bitmap_g4309.png', 'default_bitmap_image2973.png']; //Nombres de las imágenes a eliminar

  for (const filename of imagesToDelete) {
    try {
      const result = await Image.deleteOne({ filename });
      if (result.deletedCount > 0) {
        console.log(`Imagen eliminada: ${filename}`);
      } else {
        console.log(`No se encontró la imagen: ${filename}`);
      }
    } catch (err) {
      console.error(`Error eliminando la imagen: ${filename}`, err);
    }
  }

  mongoose.connection.close();
};

deleteImagesFromDB();
