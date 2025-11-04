import express from "express";
import { toNodeHandler } from "better-auth/node";

import { router as robotRoutes } from "./features/robots/robot-routes.js";
import { auth } from "#lib/auth.js";

const app = express();
const port = process.env.PORT;

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/robots", robotRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
