import { validateLogin, validateRegister, login, register, isUser, logout, isGuest } from '../auth/index.js';
import express from 'express';
export const router = express.Router();

router.get('/', isUser, (req, res, next) => {
    res.render('account', {
        title: 'Account',
        account: true
    });
});

router.get('/login', isGuest, (req, res, next) => {
    res.render('login', {
        title: 'Sign in',
        login: true,
        csrfToken: req.csrfToken(),
        message: req.session.formError
    });
    delete req.session.formError;
});

router.post('/login', validateLogin, login, (req, res, next) => {
    res.redirect('/account');
});

router.get('/register', isGuest, (req, res, next) => {
    res.render('register', {
        title: 'Sign up',
        register: true,
        csrfToken: req.csrfToken(),
        message: req.session.formError
    });
    delete req.session.formError;
});

router.post('/register', validateRegister, register, (req, res, next) => {
    res.redirect('/account');
});

router.get('/logout', isUser, logout, (req, res, next) => {
    res.redirect('/');
});
