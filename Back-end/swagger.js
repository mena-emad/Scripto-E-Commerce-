import swaggerUi from "swagger-ui-express";
import yaml from "yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = yaml.parse(
  fs.readFileSync(
    path.join(__dirname, "swagger.yaml"),
    "utf-8"
  )
);

export { swaggerUi, swaggerDocument };