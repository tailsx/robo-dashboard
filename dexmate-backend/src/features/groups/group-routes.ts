import { Router } from "express";
import { RobotService } from "./robot-service.js";
import { DatabaseError, NotFoundError } from "#utils/errors.js";
import { asyncHandler } from "#middleware/async-handler.js";
import { requireAuth } from "#middleware/auth-middleware.js";
import { appendGroups } from "#middleware/groups-middleware.js";
import { GroupService } from "#features/groups/group-service.js";

const router = Router();
const groupService = new GroupService();

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const body = req.body;
    const groups = req.userGroups || [];
    const res = await groupService.addUserToGroup();

    res.success(robots);
  })
);

router.post(
  "/groups/:groupId/robots",
  requireAuth,
  asyncHandler(async (req, res) => {
    const body = req.body;
    const groupId = req.params.groupId;

    const res = await groupService.addRobotToGroup(body.robotId, groupId);

    res.success({ isSuccessful: true });
  })
);

router.get(
  "/groups/:groupId/robots",
  requireAuth,
  asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    const res = await groupService.getRobots(groupId);

    res.success(res);
  })
);

export { router };
