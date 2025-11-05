ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "member" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "id" DROP IDENTITY;