const { Router } = require('express');
const authController = require('../connectors/auth.connector');
const authmiddleware = require('../middleware/auth.middleware');

const authRouter = Router();


authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/logout',authController.logout);
authRouter.get('/profile', authmiddleware, authController.getProfile);

module.exports = authRouter;