import { Router } from "express";
import { RobotService } from "./robot-service.js";


const router = Router();
const robotService = new RobotService();

router.get("/", async (req, res) => {
  const robots = await robotService.getAllRobots();
  res.json(robots);
});

export { router };
