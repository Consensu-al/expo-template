import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import * as schema from "./schema";

// Initialize the database
const sqliteDatabase = SQLite.openDatabaseSync("app.db");

// Initialize Drizzle client
export const db = drizzle(sqliteDatabase, { schema });

// Migration function to be called on app startup
export async function runMigrations() {
  // This is where you would typically run migrations
  // In a development environment, you might want to create tables if they don't exist
  try {
    // Example of creating tables if they don't exist (simple migration approach)
    await sqliteDatabase.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS settings (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
    
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}