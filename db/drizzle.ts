import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync } from "expo-sqlite";

import migrations from "./migrations/migrations";
import { DATABASE_NAME } from "../constants/Database";

// Single database instance
let _db = null;

// Initialize database and run migrations
export const initialize = async () => {
  // Return existing instance if already initialized
  if (_db) return _db;

  try {
    // Open SQLite database
    console.log(`Opening database: ${DATABASE_NAME}`);
    const sqliteDb = openDatabaseSync(DATABASE_NAME);

    // Initialize Drizzle ORM with the SQLite connection
    _db = drizzle(sqliteDb);

    // Run migrations
    console.log("Running migrations...");
    await migrate(_db, migrations);
    console.log("Migrations completed successfully");

    return _db;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};

// Get current database instance
export const getDb = () => _db;

// Check if migrations have completed
export const checkMigrationsCompleted = async () => {
  try {
    if (!_db) {
      return { hasCompleted: false, error: new Error("Database not initialized") };
    }

    // Simple query to check if migrations table exists
    const result = await _db.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='_drizzle_migrations'",
    );

    return {
      hasCompleted: result.rows.length > 0,
      error: null,
    };
  } catch (error) {
    return {
      hasCompleted: false,
      error,
    };
  }
};
