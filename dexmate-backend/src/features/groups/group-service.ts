import { z } from "zod";
import { createMemberSchema, member, organization, RobotsTable, userGroups } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";
import { createRobotSchema, robotSchema, robotSettings, RobotSettingsTable } from "#db/schemas/app-schemas.js";
import { and, eq, inArray, or } from "drizzle-orm";
import { NotFoundError } from "#utils/errors.js";
import { createSelectSchema } from "drizzle-zod";

type CreateRobotSchema = z.infer<typeof createRobotSchema>;
type RobotSchema = z.infer<typeof robotSchema>;
type RobotSettings = z.infer<typeof robotSettings>;
type UserGroups = z.infer<typeof userGroups>;
type CreateMemberSchema = z.infer<typeof createMemberSchema>;

const groupSchema = createSelectSchema(organization);
type GroupInfo = z.infer<typeof groupSchema>;

type GroupDetailFull = GroupInfo

class GroupService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  async getGroupDetail(groupId: string): Promise<GroupDetailFull> {
    const group = await this.db.query.organization.findFirst({
      where: eq(organization.id, groupId),
    });

    if (!group) {
      throw new NotFoundError("Group not found");
    }

    return group;
  }

  async addUserToGroup(data: CreateMemberSchema): Promise<void> {
    await this.db.insert(member).values({
      organizationId: data.organizationId,
      role: data.role,
      userId: data.userId,
    });
  }

  async getRobots(groupId: string): Promise<RobotDetail[]> {
    const robots = await this.db.query.RobotsTable.findAll({
      where: eq(RobotsTable.groupId, groupId),
    });

    return robots;
  }

  async addRobotToGroup(robotId: string, groupId: string): Promise<RobotDetail> {
    const robot = await this.db
      .update(RobotsTable)
      .values({
        groupId: groupId,
      })
      .where(eq(RobotsTable.id, robotId));

    return robot;
  }
}

export { GroupService };
