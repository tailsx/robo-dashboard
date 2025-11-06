import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { member, organization, user } from "./auth-schema";

export const ownerRoleEnum = pgEnum("owner_role", ["group", "user"]);

export const RobotsTable = pgTable(
  "robots",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    serial_number: varchar("serial_number", { length: 100 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    ownerId: text("owner_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    groupId: text("group_id").references(() => organization.id, { onDelete: "set null" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [unique().on(table.serial_number)]
);

export const RobotSettingsTable = pgTable(
  "robot_settings",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    robotId: uuid("robot_id")
      .references(() => RobotsTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 100 }).notNull(),
    settings: text("settings").notNull(),
  },
  (table) => [unique().on(table.robotId, table.userId)]
);

export const robotSettingsRelations = relations(RobotSettingsTable, ({ one }) => ({
  robot: one(RobotsTable, {
    fields: [RobotSettingsTable.robotId],
    references: [RobotsTable.id],
  }),
}));
export const memberRelations = relations(member, ({ one }) => ({
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  group: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
}));
export const robotSettings = createSelectSchema(RobotSettingsTable);
export const createRobotSettingsSchema = createInsertSchema(RobotSettingsTable);
export const updateRobotSettingsSchema = createRobotSettingsSchema.partial();

export const robotSchema = createSelectSchema(RobotsTable);
export const createRobotSchema = createInsertSchema(RobotsTable);
export const updateRobotSchema = createRobotSchema.partial();
