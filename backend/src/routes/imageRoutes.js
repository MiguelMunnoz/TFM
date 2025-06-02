const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticate, authorizeRole('admin'), upload.array('file'), imageController.uploadImage);
router.get('/download/:filename', authenticate, authorizeRole('user', 'admin'), imageController.downloadImage);
router.get('/list', authenticate, authorizeRole('user', 'admin'), imageController.listImages);
router.get('/list/:filename', authenticate, authorizeRole('user', 'admin'), imageController.getImage);
router.delete('/delete/:filename', authenticate, authorizeRole('admin'), imageController.deleteImage);

module.exports = router; 