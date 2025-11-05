import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const ownerRoleEnum = pgEnum("owner_role", ["group", "user"]);

export const RobotsTable = pgTable(
  "robots",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    serial_number: varchar("serial_number", { length: 100 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    ownerId: varchar("owner_id", { length: 100 }).notNull(),
    ownerType: ownerRoleEnum("owner_type").notNull(),
  },
  (table) => [unique().on(table.serial_number)]
);

export const RobotSettingsTable = pgTable("robot_settings", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  robotId: uuid("robot_id")
    .references(() => RobotsTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 100 }).notNull(),
  settings: text("settings").notNull(),
});

export const robotSettingsRelations = relations(RobotSettingsTable, ({ one }) => ({
  robot: one(RobotsTable, {
    fields: [RobotSettingsTable.robotId],
    references: [RobotsTable.id],
  }),
}));

export const robotSchema = createSelectSchema(RobotsTable);
export const createRobotSchema = createInsertSchema(RobotsTable);
export const updateRobotSchema = createRobotSchema.partial();
