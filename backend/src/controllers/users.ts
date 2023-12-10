import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import sendEmail from '../util/mailer';

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const rawPassword = req.body.password;

    try {
        if (!username || !email || !rawPassword) {
            throw createHttpError(400, 'Parameters missing.');
        }

        const existingUsername = await User.findOne({
            username: username,
        }).exec();
        if (existingUsername) {
            throw createHttpError(400, 'Username already in use.');
        }

        const existingEmail = await User.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(400, 'Email already in use.');
        }

        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface SignInBody {
    username?: string;
    password?: string;
}

export const singIn: RequestHandler<
    unknown,
    unknown,
    SignInBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, 'Parameters missing');
        }

        const user = await User.findOne({ username: username })
            .select('+password +email')
            .exec();

        if (!user) {
            throw createHttpError(401, 'Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, 'invalid credentials');
        }

        req.session.userId = user._id;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: userPassword, ...userWithoutPassword } =
            user.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        const user = await User.findById(authenticatedUserId)
            .select('+email')
            .exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};

interface PasswordResetRequestBody {
    emailOrUsername?: string;
}

export const requestPasswordReset: RequestHandler<
    unknown,
    unknown,
    PasswordResetRequestBody,
    unknown
> = async (req, res, next) => {
    const emailOrUsername = req.body.emailOrUsername;

    try {
        if (!emailOrUsername) {
            throw createHttpError(400, 'Email or username is required');
        }

        const user = await User.findOne({
            $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
        })
            .select('+email')
            .exec();
        if (!user) {
            throw createHttpError(400, 'User not found');
        }

        const passwordResetToken = crypto.randomBytes(20).toString('hex');

        const resetLink = `http://localhost:5173/reset-password/${passwordResetToken}`;

        user.resetToken = passwordResetToken;
        user.resetTokenExpires = new Date(Date.now() + 5 * 60 * 60 * 1000);
        await user.save();

        await sendEmail({
            from: 'test@example.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `Hi ${user.username}, we have recieved a password reset request from your side. If you have requested for the password reset, please click the following link to reset your password: ${resetLink}. The link will expire in 5 hours.`,
        });

        res.status(200).json({ success: 'Email sent for pasword reset' });
    } catch (error) {
        next(error);
    }
};

interface ResetPasswordParams {
    resetToken: string;
}

interface ResetPasswordBody {
    newPassword?: string;
    confirmPassword?: string;
}

export const resetPassword: RequestHandler<
    ResetPasswordParams,
    unknown,
    ResetPasswordBody,
    unknown
> = async (req, res, next) => {
    const resetToken = req.params.resetToken;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    try {
        if (!newPassword || !confirmPassword) {
            throw createHttpError(400, 'Parameters missing');
        }

        if (newPassword !== confirmPassword) {
            throw createHttpError(400, 'Passwords do not match');
        }

        const user = await User.findOne({
            resetToken: resetToken,
            resetTokenExpires: { $gt: Date.now() },
        }).exec();
        if (!user) {
            throw createHttpError(400, 'Invalid or expired token');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        res.status(200).json({ success: 'Password reset successful' });
    } catch (error) {
        next(error);
    }
};
