const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const upload = require('../middlewares/multer');

// Ruta para subir una imagen
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { filename, path, size } = req.file;

        // Guarda el path con la carpeta correcta
        const newImage = new Image({
            filename,
            path: `uploads/${filename}`,  // Cambia aquí para incluir la carpeta 'uploads'
            size
        });

        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Ruta para obtener todas las imágenes
router.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;