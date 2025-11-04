import { RobotSettingsTable, RobotsTable } from "#db/schema.js";
import { db } from "#db/database.js";
import type { Database } from "#db/database.js";

class RobotService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  async getAllRobots() {
    return this.db.select().from(RobotsTable);
  }
}

export { RobotService };
