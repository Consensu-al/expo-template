import type { SQLiteDatabase } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "@/app/_layout";

// Create database connection
const expoDb: SQLiteDatabase = openDatabaseSync(DATABASE_NAME);

// Initialize drizzle with the database connection
export const db = drizzle(expoDb);
