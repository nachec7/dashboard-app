import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema: schema });

export const closePool = async () => {
  await pool.end();
  console.log("Pool de base de datos cerrado");
};

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de Postgres");
});

/* 
import { closePool } from './db';

// Al apagar la aplicación
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});
*/
