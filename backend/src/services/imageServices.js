const { getTasks, getTaskById, updateTask } = require('./taskServices');

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

async function deleteFile(filename) {
    try {
        const tasks = await getTasks();
        const isUsed = tasks.some(task => task.images.includes(filename));
        const usedTasks = tasks.filter(task => task.images.includes(filename));
        console.log('La imagen se esta usando en otras tareas: ', isUsed);
        console.log('La imagen se esta usando en: ', usedTasks);
    
        if (!isUsed) {
            const filePath = path.join(uploadDir, filename);
            console.log('Accediendo al directorio donde esta la imagen: ', filePath);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('[ERROR] al eliminar el archivo:', err);
                } else {
                    console.log(`Archivo '${filename}' eliminado exitosamente.`);
                }
            });
        }
    } catch (error) {
        console.error('[ERROR] deleting fileen deleteFileIfUnused:', error);
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