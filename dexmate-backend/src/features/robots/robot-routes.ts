import { Router } from "express";
import { RobotService } from "./robot-service.js";
import { DatabaseError } from "#utils/errors.js";
import { asyncHandler } from "#middleware/async-handler.js";

const router = Router();
const robotService = new RobotService();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const robots = await robotService.getAllRobots();
    res.json(robots);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newRobot = await robotService.createRobot(req.body);
    res.status(201).json(newRobot);
  })
);

export { router };
