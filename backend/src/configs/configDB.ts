import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const connectToDatabase = (databaseName: string) => {
  const connection = mysql.createConnection({
    ...dbConfig,
    database: databaseName,
  });
  return connection;
};

export default connectToDatabase;
