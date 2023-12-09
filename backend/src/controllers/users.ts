import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import User from '../models/User';

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
        res.status(200).json(user);
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
