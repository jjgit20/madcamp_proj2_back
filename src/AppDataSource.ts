import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/entity/*.ts"],
  synchronize: process.env.MIGRATIONS === "true", //Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production - otherwise you can lose production data.
});
