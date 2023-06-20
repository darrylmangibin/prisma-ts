import "reflect-metadata";
import "dotenv/config";
import listEndpoints = require("express-list-endpoints");
import { app } from "@main/server";

console.table(
  listEndpoints(app).filter((endpoint) =>
    endpoint.path.includes(process.argv[2] || "")
  )
);
