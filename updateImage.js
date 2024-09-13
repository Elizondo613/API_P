const mongoose = require('mongoose');
const Image = require('./models/Image');
require('dotenv').config();

const updateImageName = async (oldName, newName) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Primero, buscamos la imagen
    const image = await Image.findOne({ name: oldName });
    
    if (!image) {
      console.log(`No se encontró ninguna imagen con el nombre: ${oldName}`);
      return;
    }
    
    // Si la imagen existe, la actualizamos
    const result = await Image.updateOne({ name: oldName }, { name: newName });
    
    console.log('Resultado de la actualización:', result);
    
    if (result.modifiedCount > 0) {
      console.log(`Imagen actualizada exitosamente de '${oldName}' a '${newName}'`);
    } else {
      console.log('No se realizó ninguna actualización. Verifica si el nuevo nombre es diferente del antiguo.');
    }
  } catch (error) {
    console.error('Error actualizando la imagen:', error);
  } finally {
    await mongoose.disconnect();
  }
};

updateImageName('V-01.jpg', 'default_V-01.jpg');