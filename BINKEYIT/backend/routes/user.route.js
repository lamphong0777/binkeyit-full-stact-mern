import { Router } from 'express';
import {
    forgotPasswordController,
    getAllUserController,
    loginController,
    logoutController,
    refreshTokenController,
    registerUserController,
    resetPasswordController,
    updateUserDetailController,
    uploadAvatarController,
    userDetailsController,
    verifyEmailController,
    verifyForgotPasswordOtpController
} from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router();

userRouter.get('/', getAllUserController);
userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', auth, logoutController);

userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);
userRouter.put('/update-profile', auth, updateUserDetailController);
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtpController);
userRouter.put('/reset-password', resetPasswordController);
userRouter.post('/refresh-token', refreshTokenController);
userRouter.get('/user-details', auth, userDetailsController);

export default userRouter;