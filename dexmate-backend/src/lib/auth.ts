import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "#db/database.js";
import { ac, admin, member, owner } from "#features/auth/permissions.js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    organization({
      ac,
      roles: { member, admin, owner },
    }),
  ],
});
