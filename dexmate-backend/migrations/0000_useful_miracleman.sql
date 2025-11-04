CREATE TYPE "public"."owner_role" AS ENUM('group', 'user');--> statement-breakpoint
CREATE TABLE "robot_settings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "robot_settings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"robot_id" uuid NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"settings" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "robots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"serial_number" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"owner_id" varchar(100) NOT NULL,
	"owner_type" "owner_role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "robot_settings" ADD CONSTRAINT "robot_settings_robot_id_robots_id_fk" FOREIGN KEY ("robot_id") REFERENCES "public"."robots"("id") ON DELETE cascade ON UPDATE no action;