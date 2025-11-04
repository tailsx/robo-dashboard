import { describe, expect, it } from "vitest";
import { db } from "./database.js";

describe("Database Connection", () => {
  it("should establish a connection to the database", async () => {
    const result = await db.execute("SELECT 1 + 1 AS result");
    expect(result.rows[0].result).toBe(2);
  });
});
