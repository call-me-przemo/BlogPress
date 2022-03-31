import { sequelize } from './connection.js';
import { Model, DataTypes } from 'sequelize';

export class Admin extends Model {}

Admin.init({
    nick: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rememberToken: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Admin'
});
