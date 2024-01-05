import dotenv from "dotenv";
import path from "path";

switch (process.env.NODE_ENV) {
  case "prod":
    dotenv.config({ path: path.resolve(process.cwd(), ".env.prod") });
    break;
  case "dev":
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
    break;
  case "test":
    dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });
    break;
  default:
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}
