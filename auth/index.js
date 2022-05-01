import validator from 'validator';
import { app } from '../app.js';
import { User } from '../db/models/user.js';
import { hash, compare } from 'bcrypt';
import createError from 'http-errors';
import { asyncInvoke } from '../db/session.js';
import { Op } from 'sequelize';

export function validateLogin(req, res, next) {
    try {
        if(!validator.isLength(req.body.nick, { min: 4, max: 30 })) {
            throw new Error('Login must contains 4 to 30 chars');
        }
        req.body.nick = validator.escape(req.body.nick);

        if(!validator.isLength(req.body.password, { min: 10, max: 50 })) {
            throw new Error('Password must contains 10 to 50 chars');
        }
    }
    catch(err) {
        app.locals.loginError = err;
        return res.redirect('/account/login');
    }
    return next();
}

export function validateRegister(req, res, next) {
    try {
        if(!validator.isLength(req.body.name, { min: 2, max: 50 })) {
            throw new Error('Name must contains 2 to 50 chars');
        }
        req.body.name = validator.escape(req.body.name);

        if(!validator.isLength(req.body.surname, { min: 2, max: 50 })) {
            throw new Error('Surname must contains 2 to 50 chars');
        }
        req.body.surname = validator.escape(req.body.surname);

        if(!validator.isLength(req.body.nick, { min: 4, max: 30 })) {
            throw new Error('Nick must contains 4 to 30 chars');
        }
        req.body.nick = validator.escape(req.body.nick);

        if(!validator.isLength(req.body.email, { min: 4, max: 50 }) || !validator.isEmail(req.body.email)) {
            throw new Error('Field email must be correct address, and contains 4 to 50 chars');
        }
        req.body.email = validator.escape(req.body.email);

        if(!validator.isLength(req.body.password, { min: 10, max: 50 })) {
            throw new Error('Password must contains 10 to 50 chars');
        }
    }
    catch(err) {
        app.locals.registerError = err;
        return res.redirect('/account/register');
    }
    return next();
}

export async function login(req, res, next) {
    let user;
    try {
        const passwordHash = await hash(req.body.password, 10);
        user = await User.findOne({
            where: {
                nick: req.body.nick,
            }
        });
        if(!user || !await compare(req.body.password, passwordHash)) {
            app.locals.loginError = 'Given credentials are incorrect';
            return res.redirect('/account/login');
        }
        await asyncInvoke(req, 'regenerate');
    }
    catch(err) {
        return next(createError(500));
    }
    req.session.userId = user.id;
    return next();
}

export async function logout(req, res, next) {
    try {
        await asyncInvoke(req, 'destroy');
        await asyncInvoke(req, 'regenerate');
    }
    catch(err) {
        return next(createError(500));
    }
    return next();
}

export function isUser(req, res, next) {
    req.session?.userId ? next() : next(createError(403));
}

export async function register(req, res, next) {
    let user, created;
    try {
        [ user, created ] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    {
                        nick: req.body.nick
                    },
                    {
                        email: req.body.email
                    }
                ]
            },
            defaults: {
                nick: req.body.nick,
                email: req.body.email,
                password: await hash(req.body.password, 10),
                firstName: req.body.name,
                lastName: req.body.surname,
                active: false
            }
        });
        if(!created) {
            app.locals.registerError = { message: 'Given nick or email already exists, please choose another one' };
            return res.redirect('/account/register');
        }
        await asyncInvoke(req, 'regenerate');
    }
    catch(err) {
        return next(createError(500));
    }
    req.session.userId = user.id;
    return next();
}
