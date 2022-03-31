import store from 'connect-session-sequelize';
import { sequelize } from './connection.js';
import session from 'express-session';

const sessionStore = store(session.Store);
export default new sessionStore({
    db: sequelize
});

export function asyncInvoke(req, name) {
    return new Promise((resolve, reject) => {
        req.session[name](err => {
            if(err) {
                reject();
            }
            resolve();
        });
    });
}