import { sequelize } from "../connection.js";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init(
  {
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    about: DataTypes.TEXT,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rememberToken: {
      type: DataTypes.STRING,
      unique: true,
    },
    activationToken: {
      type: DataTypes.STRING,
      unique: true,
    },
    avatarPath: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);
