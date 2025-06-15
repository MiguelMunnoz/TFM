const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUserController);
router.post('/login', authController.loginUserController);
router.get('/logout', authController.logoutController);
router.put('/user/update/:id', authenticate, authController.updateUserController);

module.exports = router;
