import { Router } from "express";
import { RobotService } from "./robot-service.js";
import { DatabaseError, NotFoundError } from "#utils/errors.js";
import { asyncHandler } from "#middleware/async-handler.js";
import { requireAuth } from "#middleware/auth-middleware.js";

const router = Router();
const robotService = new RobotService();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const robots = await robotService.getAllRobots(user.id);

    res.success(robots);
  })
);

router.get(
  "/:robotId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const robotId = req.params.robotId;

    const robot = await robotService.getRobotById(robotId);

    if (robot && robot.ownerId !== user.id) {
      throw new NotFoundError("Not found " + robotId);
    }

    res.success(robot);
  })
);

router.get(
  "/:robotId/settings/user",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const robotId = req.params.robotId;
    const settings = await robotService.getUserRobotSettings(user.id, robotId);

    res.success(settings);
  })
);

router.post(
  "/:robotId/settings/user",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const robotId = req.params.robotId;
    const settings = req.body;

    const setting = await robotService.createUserRobotSetting(user.id, robotId, settings);
    res.success(setting, 201);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const newRobot = await robotService.createRobot(user.id, req.body);
    res.success(newRobot, 201);
  })
);

export { router };
