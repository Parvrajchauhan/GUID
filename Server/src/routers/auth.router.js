const { Router } = require('express');
const authController = require('../controller/auth.controller');
const {authMiddleware} = require('../middleware/auth.middleware');

const authRouter = Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/logout',authController.logout);
authRouter.get('/profile', authMiddleware, authController.getProfile);

module.exports = authRouter;