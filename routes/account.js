import express from 'express';
import { validateLogin, validateRegister } from '../auth/index.js';
export const router = express.Router();

router.get('/', (req, res, next) => {;
    res.end();
});

router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Sign in',
        login: true,
        csrfToken: req.csrfToken()
    });
});

router.post('/login', validateLogin, async (req, res, next) => {
    console.log(req.body);
    res.redirect('back');
});

router.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'Sign up',
        register: true,
        csrfToken: req.csrfToken()
    });
});

router.post('/register', async (req, res, next) => {
    console.log(req.body);
    res.redirect('back');
});
