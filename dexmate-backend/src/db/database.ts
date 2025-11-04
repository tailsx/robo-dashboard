import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

const connectionInfo = {
  connectionString: process.env.DATABASE_URL,
};
console.log(connectionInfo)
const pool = new Pool(connectionInfo);
const db = drizzle({ client: pool, schema });


export type Database = typeof db;

export { db };
