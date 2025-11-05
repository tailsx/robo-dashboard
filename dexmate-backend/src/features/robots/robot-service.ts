import { z } from "zod";
import { RobotsTable } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";
import { createRobotSchema, robotSchema } from "#db/schemas/app-schemas.js";

type CreateRobotSchema = z.infer<typeof createRobotSchema>;
type RobotSchema = z.infer<typeof robotSchema>;

class RobotService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  async getAllRobots() {
    return this.db.select().from(RobotsTable);
  }

  async createRobot(data: CreateRobotSchema): Promise<RobotSchema["id"]> {
    const result = await this.db
      .insert(RobotsTable)
      .values({
        serial_number: data.serial_number,
        name: data.name,
        ownerId: data.ownerId,
        ownerType: data.ownerType,
      })
      .returning();
    console.log("Inserted robot:", result[0]);

    return result[0].id;
  }
}

export { RobotService };
