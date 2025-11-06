import { z } from "zod";
import { RobotsTable, userGroups } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";
import { createRobotSchema, robotSchema, robotSettings, RobotSettingsTable } from "#db/schemas/app-schemas.js";
import { and, asc, eq, inArray, or, desc } from "drizzle-orm";
import { NotFoundError } from "#utils/errors.js";

type CreateRobotSchema = z.infer<typeof createRobotSchema>;
type RobotSchema = z.infer<typeof robotSchema>;
type RobotSettings = z.infer<typeof robotSettings>;
type UserGroups = z.infer<typeof userGroups>;

type QueryFilters = {
  limit?: number;
  offset?: number;
  orderBy?: "asc" | "desc";
};

class RobotService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  async getAllRobots(ownerId: string, group?: UserGroups[], filter?: QueryFilters): Promise<RobotSchema[]> {
    const conditions = [eq(RobotsTable.ownerId, ownerId)];
    if (group && group.length > 0) {
      const groupIds = group.map((g) => g.id);
      conditions.push(inArray(RobotsTable.groupId, groupIds));
    }

    const query = this.db
      .select()
      .from(RobotsTable)
      .where(or(...conditions));

    if (filter?.orderBy) {
      query.orderBy(filter.orderBy === "asc" ? asc(RobotsTable.createdAt) : desc(RobotsTable.createdAt));
    }
    if (filter?.limit) {
      console.log("Applying limit:", filter.limit);
      query.limit(filter.limit);
    }
    if (filter?.offset) {
      console.log("Applying offset:", filter.offset);
      query.offset(filter.offset);
    }

    const result = await query;
    return result;
  }

  async getRobotById(robotId: RobotSchema["id"]): Promise<RobotSchema | undefined> {
    const result = await this.db.query.RobotsTable.findFirst({
      where: eq(RobotsTable.id, robotId),
    });

    if (!result) {
      throw new NotFoundError("Robot not found");
    }

    return result;
  }

  async createRobot(ownerId: string, data: CreateRobotSchema): Promise<{ id: RobotSchema["id"] }> {
    const result = await this.db
      .insert(RobotsTable)
      .values({
        serial_number: data.serial_number,
        name: data.name,
        ownerId,
      })
      .returning();

    return {
      id: result[0].id,
    };
  }

  async deleteRobot(ownerId: string, robotId: RobotSchema["id"]): Promise<void> {
    const result = await this.db.delete(RobotsTable).where(and(eq(RobotsTable.id, robotId), eq(RobotsTable.ownerId, ownerId)));
  }

  async getUserRobotSettings(userId: string, robotId: RobotSchema["id"]): Promise<RobotSettings | undefined> {
    {
      const result = await this.db.query.RobotSettingsTable.findFirst({
        where: and(eq(RobotSettingsTable.userId, userId), eq(RobotSettingsTable.robotId, robotId)),
      });

      return result;
    }
  }

  async createUserRobotSetting(userId: string, robotId: RobotSchema["id"], json: Record<string, string>): Promise<RobotSettings["id"]> {
    const result = await this.db
      .insert(RobotSettingsTable)
      .values({
        robotId: robotId,
        settings: JSON.stringify(json),
        userId,
      })
      .returning();

    return result[0].id;
  }
}

export { RobotService };
