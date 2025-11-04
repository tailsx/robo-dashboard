import express from "express";
const app = express();
const port = process.env.PORT;

import { router as robotRoutes } from "./features/robots/robot-routes.js";

app.use("/robots", robotRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
