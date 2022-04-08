import { app } from '../app.js';
import { validateLogin, validateRegister } from '../auth/index.js';
import express from 'express';
export const router = express.Router();

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

router.post('/login', validateLogin, (req, res, next) => {
    
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

router.post('/register', validateRegister, (req, res, next) => {
    
});
