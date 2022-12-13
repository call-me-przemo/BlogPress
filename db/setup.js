import { createConnection } from "mysql2/promise";

const connection = await createConnection({
  host: "localhost",
  user: "root",
  password: "mysql_root",
});

await connection.query("CREATE DATABASE IF NOT EXISTS blogpress");
await connection.query(
  `CREATE USER IF NOT EXISTS blogpress IDENTIFIED BY 'blogpress'`
);
await connection.query(`GRANT ALL PRIVILEGES ON blogpress.* to blogpress`);

console.log("Database has been created");

await connection.end();
