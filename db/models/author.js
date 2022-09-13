import { sequelize } from "../connection.js";
import { Model, DataTypes } from "sequelize";

export class Author extends Model {}

Author.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: {
          tableName: "Users",
        },
      },
      key: "id",
    },
    PostId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: {
          tableName: "Posts",
        },
      },
      key: "id",
    },
  },
  {
    sequelize,
    modelName: "Author",
  }
);
