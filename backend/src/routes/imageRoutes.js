const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticate, upload.array('file'), imageController.uploadImage);
router.get('/download/:filename', authenticate, imageController.downloadImage);
router.get('/list', authenticate, imageController.listImages);
router.get('/list/:filename', authenticate, imageController.getImage);
router.delete('/delete/:filename', authenticate, imageController.deleteImage);

module.exports = router; 