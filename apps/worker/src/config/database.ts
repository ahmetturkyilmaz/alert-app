import { Pool } from "pg";

export const dbClient = new Pool({
  user: process.env.PG_DB_USER,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_DB_PASSWORD,
  port: 5432,
});

dbClient.connect();
