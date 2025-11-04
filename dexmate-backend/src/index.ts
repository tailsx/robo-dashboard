import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

import { router as robotRoutes } from "./features/robots/robot-routes.js";
import { auth } from "#lib/auth.js";

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173", // Vite frontend
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Better Auth middleware
app.all("/api/auth/{*any}", toNodeHandler(auth));

// app routes
app.use("/robots", robotRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
