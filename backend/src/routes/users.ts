import express from 'express';
import * as UserController from '../controllers/users';
import { requiresAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requiresAuth, UserController.getAuthenticatedUser);

router.post('/signup', UserController.signUp);

router.post('/signin', UserController.singIn);

router.post('/logout', UserController.logout);

router.post('/reset-password', UserController.requestPasswordReset);

router.post('/reset-password/:resetToken', UserController.resetPassword);

export default router;
