const { getTaskById, updateTask } = require('./taskServices');

const fs = require('fs').promises;
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads');


async function initializeUploadDir() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
}

async function uploadFile(file) {
    try {
        if (!file || !file.originalname || !file.buffer) {
            throw new Error('Invalid file');
        }

        await fs.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, file.originalname);
        await fs.writeFile(filePath, file.buffer);

        return file.originalname;
    } catch (err) {
        console.log('[ERROR] Error saving files:', err);
        throw err;
    }
}

async function downloadFile(filename) {
    const filePath = path.join(uploadDir, filename);
    const data = await fs.readFile(filePath); 
    return data;
}

async function listFiles() {
    const listFiles = await fs.readdir(uploadDir); 
    return listFiles;
}

async function getFile(filename) {
    const filePath = path.join(uploadDir, filename); 
    const imageBuffer = await fs.readFile(filePath);

    // Detectar tipo MIME desde la extensión
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';
    return { contentType, imageBuffer };
}

async function deleteFile(filename, taskId) {
    try {
        const task = await getTaskById(taskId);
        const images = task.images;
        const newImages = images.filter(img => img !== filename );
        task.images = newImages;
        await updateTask(taskId, task);
    } catch (error) {
        console.log('[ERROR] Error deleting file:', error);
        throw error;
    }
    
}

// Inicializar el directorio de uploads
initializeUploadDir();

module.exports = {
    uploadFile,
    downloadFile,
    listFiles,
    getFile,
    deleteFile
}; 