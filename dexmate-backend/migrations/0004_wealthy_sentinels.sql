ALTER TABLE "organization" DROP COLUMN "logo";--> statement-breakpoint
ALTER TABLE "robot_settings" ADD CONSTRAINT "robot_settings_robot_id_user_id_unique" UNIQUE("robot_id","user_id");