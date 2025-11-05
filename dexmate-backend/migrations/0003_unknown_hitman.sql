ALTER TABLE "robots" ALTER COLUMN "owner_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "robots" ADD COLUMN "group_id" text;--> statement-breakpoint
ALTER TABLE "robots" ADD CONSTRAINT "robots_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "robots" ADD CONSTRAINT "robots_group_id_organization_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."organization"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "robots" DROP COLUMN "owner_type";