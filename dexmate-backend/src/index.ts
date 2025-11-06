import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import type { CorsOptions } from "cors";

import { router as robotRoutes } from "./features/robots/robot-routes.js";
import { router as groupRoutes } from "./features/groups/group-routes.js";
import { auth } from "#lib/auth.js";
import { errorHandler } from "#middleware/error-handler.js";
import { responseHandler } from "#middleware/response-handler.js";

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173", // Vite frontend
];
const corsOptions: CorsOptions = {
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

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(responseHandler);

// Better Auth middleware
app.all("/api/auth/{*any}", toNodeHandler(auth));

// app routes
app.use("/robots", robotRoutes);
app.use(groupRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
