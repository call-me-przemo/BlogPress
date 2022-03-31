import { sequelize } from './connection.js';
import { Model, DataTypes } from 'sequelize';

export class Comment extends Model {}

Comment.init({
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'Users'
            }
        },
        key: 'id'
    },
    PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'Posts'
            }
        },
        key: 'id'
    },
    rate: DataTypes.TINYINT,
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment'
});
