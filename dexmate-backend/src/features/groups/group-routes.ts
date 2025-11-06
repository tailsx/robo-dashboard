import { Router } from "express";
import { asyncHandler } from "#middleware/async-handler.js";
import { requireAuth } from "#middleware/auth-middleware.js";
import { GroupService } from "#features/groups/group-service.js";

const router = Router();
const groupService = new GroupService();

router.post(
  "/groups",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user!;
    const body = req.body;
    const groups = req.userGroups || [];
    const result = await groupService.addUserToGroup();

    res.success(result);
  })
);

router.get(
  "/groups/:groupId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    const result = await groupService.getGroupDetail(groupId);

    res.success(result);
  })
);

router.post(
  "/groups/:groupId/robots",
  requireAuth,
  asyncHandler(async (req, res) => {
    const body = req.body;
    const groupId = req.params.groupId;

    const result = await groupService.addRobotToGroup(body.robotId, groupId);

    res.success({ isSuccessful: true });
  })
);

router.get(
  "/groups/:groupId/robots",
  requireAuth,
  asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    const result = await groupService.getRobots(groupId);

    res.success(result);
  })
);

export { router };
