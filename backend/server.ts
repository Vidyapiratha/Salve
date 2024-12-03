import { createReadStream } from "fs";
import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./router/router";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
