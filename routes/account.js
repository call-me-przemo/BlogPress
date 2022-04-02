import express from 'express';
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

router.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'Sign up',
        register: true
    });
});