const path = require('path');
const imageService = require('../services/imageServices');

const imageController = {    

    uploadImage: [
        async (req, res) => {
            console.log('Info que me llega de las imagenes: ', req.files);
            try {
                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ error: 'Error no files provided' });
                }
    
                const filenames = [];
    
                for (const file of req.files) {
                    const filename = await imageService.uploadFile(file);
                    filenames.push(filename);
                }
                
                const resData = {
                    message: 'Upload files succesfully',
                    files: filenames
                }
                res.status(201).json(resData);
            } catch (error) {
                console.log('[ERROR] Error uploading files: ', error);
                res.status(500).json({ error: 'Error uploading files' });
            }
        }
    ],
    downloadImage: [
        async (req, res) => {
            try {
                const { filename } = req.params;
                const fileBuffer = await imageService.downloadFile(filename);
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
                res.send(fileBuffer);
            } catch (error) {
                console.log('[ERROR] Error downloading files: ', error);
                res.status(404).json({ error: 'Error downloading files' });
            }
        }
    ],
    listImages: [
        async (req, res) => {
            try {
                const files = await imageService.listFiles();
                res.json(files);
            } catch (error) {
                console.log('[ERROR] Error listing files: ', error);
                res.status(500).json({ error: 'Error listing files' });
            }
        }
    ],
    getImage: [
    async (req, res) => {
        const { filename } = req.params;

        try {
            const info = await imageService.getFile(filename);
            console.log('Info tras obtener la imagen en el server: ', info);

            res.set('Content-Type', info.contentType);
            res.send(info.imageBuffer);
        } catch (error) {
            console.log('[ERROR] Error getting files: ', error);
            res.status(500).json({ error: 'Error getting files' });
        }
    }
],
    deleteImage: [
        async (req, res) => {
            try {
                const { filename } = req.params;
                console.log(`Eliminando imagenes con nombre ${filename}`)
                await imageService.deleteFile(filename);
                res.status(200).json({ message: 'Archivo eliminado exitosamente' });
            } catch (error) {
                console.log('Error al eliminar archivo:', error);
                res.status(404).json({ error: 'Archivo no encontrado' });
            }
        }
    ]
}

module.exports = imageController;