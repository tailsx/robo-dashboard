import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionInfo = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    database: process.env.DB_DATABASE!,
    ssl: true,
}
const pool = new Pool(connectionInfo);
const db = drizzle({ client: pool });

export type Database = typeof db;

export { db };
