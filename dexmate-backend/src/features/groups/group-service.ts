import { z } from "zod";
import { createMemberSchema, member, organization, RobotsTable, user, userGroups } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";
import { createRobotSchema, robotSchema, robotSettings, RobotSettingsTable } from "#db/schemas/app-schemas.js";
import { and, eq, inArray, or } from "drizzle-orm";
import { NotFoundError } from "#utils/errors.js";
import { createSelectSchema } from "drizzle-zod";
import { auth } from "#lib/auth.js";

const userSchema = createSelectSchema(user);

type CreateRobotSchema = z.infer<typeof createRobotSchema>;
type RobotSchema = z.infer<typeof robotSchema>;
type RobotSettings = z.infer<typeof robotSettings>;
type UserGroups = z.infer<typeof userGroups>;
type CreateMemberSchema = z.infer<typeof createMemberSchema>;

const groupSchema = createSelectSchema(organization);
type GroupInfo = z.infer<typeof groupSchema>;

type GroupDetailFull = GroupInfo;
type GroupMember = z.infer<typeof user> & { role: string };
type User = z.infer<typeof userSchema>;

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

  /** Group Management */
  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    const members = await this.db.query.member.findMany({
      where: eq(member.organizationId, groupId),
      with: {
        user: true,
      },
    });

    return members.map((member) => ({
      ...member.user,
      role: member.role,
    }));
  }

  async addUserToGroup(groupId: string, data: Pick<CreateMemberSchema, "role"> & { email: string }): Promise<GroupMember> {
    const _user = await this.db.query.user.findFirst({
      where: eq(user.email, data.email),
    });

    if (!_user) {
      throw new NotFoundError("User not found with email");
    }

    const result = await auth.api.addMember({
      body: {
        userId: _user.id,
        // @ts-expect-error string vs enum issue
        role: data.role || "member",
        organizationId: groupId,
      },
    });
    console.log(result);

    return {
      ..._user,
      role: data.role || "member",
    };
  }

  async removeUserFromGroup(groupId: string, userId: string): Promise<void> {
    console.log("Removing user from group", groupId, userId);
    const result = await this.db.delete(member).where(and(eq(member.organizationId, groupId), eq(member.userId, userId)));
    console.log(result);
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
      .set({
        groupId: groupId,
      })
      .where(eq(RobotsTable.id, robotId));

    return robot;
  }
}

export { GroupService };
