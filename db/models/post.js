import { sequelize } from "../connection.js";
import { Model, DataTypes } from "sequelize";

export class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    logoPath: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Post",
  }
);
