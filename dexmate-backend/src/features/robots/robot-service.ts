import { z } from "zod";
import { RobotsTable } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";
import { createRobotSchema, robotSchema } from "#db/schemas/app-schemas.js";
import { eq } from "drizzle-orm";
import { NotFoundError } from "#utils/errors.js";

type CreateRobotSchema = z.infer<typeof createRobotSchema>;
type RobotSchema = z.infer<typeof robotSchema>;

class RobotService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  async getAllRobots(ownerId: string): Promise<RobotSchema[]> {
    return this.db.select().from(RobotsTable).where(eq(RobotsTable.ownerId, ownerId));
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

  async createRobot(data: CreateRobotSchema): Promise<{ id: RobotSchema["id"] }> {
    const result = await this.db
      .insert(RobotsTable)
      .values({
        serial_number: data.serial_number,
        name: data.name,
        ownerId: data.ownerId,
        ownerType: data.ownerType,
      })
      .returning();

    return {
      id: result[0].id,
    };
  }
}

export { RobotService };
