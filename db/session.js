import store from 'connect-session-sequelize';
import { sequelize } from './connection.js';
import session from 'express-session';

const sessionStore = store(session.Store);
export default new sessionStore({
    db: sequelize
});

export function destroyAsync(req) {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if(err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function regenerateAsync(req) {
    return new Promise((resolve, reject) => {
        req.session.regenerate((err) => {
            if(err) {
                reject(err);
            }
            resolve();
        });
    });
}
