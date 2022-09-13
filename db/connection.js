import { Sequelize } from "sequelize";
import { readFile } from "fs/promises";
import { load } from "js-yaml";
import { __dirname } from "../rootdir.js";
import { join } from "path";

const file = await readFile(join(__dirname, "db-config.yaml"));
const { database, username, password, host, dialect } = await load(file);
export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});
