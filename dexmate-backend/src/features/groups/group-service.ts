import { z } from "zod";
import { createMemberSchema, member, RobotsTable, userGroups } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";
import { createRobotSchema, robotSchema, robotSettings, RobotSettingsTable } from "#db/schemas/app-schemas.js";
import { and, eq, inArray, or } from "drizzle-orm";
import { NotFoundError } from "#utils/errors.js";

type CreateRobotSchema = z.infer<typeof createRobotSchema>;
type RobotSchema = z.infer<typeof robotSchema>;
type RobotSettings = z.infer<typeof robotSettings>;
type UserGroups = z.infer<typeof userGroups>;
type CreateMemberSchema = z.infer<typeof createMemberSchema>;

class GroupService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  async addUserToGroup(data: CreateMemberSchema): Promise<void> {
    await this.db.insert(member).values({
        organizationId: data.organizationId,
        role: data.role,
        userId: data.userId,
    });
  }
}

export { GroupService };
