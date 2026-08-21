import swaggerUi from "swagger-ui-express";
import yaml from "yaml";
import fs from "fs";
const swaggerDocument = yaml.parse(fs.readFileSync("./swagger.yaml", "utf-8"));
export  {swaggerUi , swaggerDocument};