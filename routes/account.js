import validator from 'validator';
import { app } from '../app.js';
import express from 'express';
export const router = express.Router();

function validateLogin(req, res, next) {
    try {
        if(!validator.isLength(req.body.login, { min: 4, max: 30 })) {
            throw new Error('Login must contains 4 to 30 chars');
        }
        req.body.login = validator.escape(req.body.login);

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

function validateRegister(req, res, next) {
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

router.get('/', (req, res, next) => {
    res.end();
});

router.get('/login', (req, res, next) => {
    let message;
    if(app.locals?.loginError) {
        message = app.locals.loginError.message;
        delete app.locals.loginError;
    }
    res.render('login', {
        title: 'Sign in',
        login: true,
        csrfToken: req.csrfToken(),
        message
    });
});

router.post('/login', validateLogin, async (req, res, next) => {
    
});

router.get('/register', (req, res, next) => {
    let message;
    if(app.locals?.registerError) {
        message = app.locals.registerError.message;
        delete app.locals.registerError;
    }
    res.render('register', {
        title: 'Sign up',
        register: true,
        csrfToken: req.csrfToken(),
        message
    });
});

router.post('/register', validateRegister, async (req, res, next) => {
    
});
