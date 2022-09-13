import { sequelize } from "../connection.js";
import { Model, DataTypes } from "sequelize";

export class Post extends Model {}

Post.init(
  {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);
