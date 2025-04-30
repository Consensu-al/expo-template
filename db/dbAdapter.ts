/**
 * Database adapter for handling SQLite operations
 * 
 * This adapter provides a uniform interface for database operations
 * regardless of the underlying SQLite implementation
 */
import { Platform } from "react-native";
import { DATABASE_NAME } from "../constants/Database";

// Import SQLite with fallback mechanisms
let SQLiteImpl: any = null;

// Logger for debugging
const logger = {
  log: console.log,
  error: console.error,
  warn: console.warn
};

/**
 * Initialize SQLite implementation
 */
export const initializeSQLite = async (): Promise<{ success: boolean; error?: Error }> => {
  try {
    // First attempt: direct require
    try {
      SQLiteImpl = require('expo-sqlite');
      logger.log("SQLite imported via require");
      if (SQLiteImpl && typeof SQLiteImpl.openDatabase === 'function') {
        return { success: true };
      }
    } catch (err) {
      logger.warn("Failed to import SQLite via require:", err);
    }
    
    // Second attempt: dynamic import
    try {
      const SQLiteModule = await import('expo-sqlite');
      SQLiteImpl = SQLiteModule;
      logger.log("SQLite imported via dynamic import");
      if (SQLiteImpl && typeof SQLiteImpl.openDatabase === 'function') {
        return { success: true };
      }
    } catch (err) {
      logger.warn("Failed to import SQLite via dynamic import:", err);
    }
    
    // If we get here, we couldn't load SQLite
    return { 
      success: false, 
      error: new Error("Could not load expo-sqlite. Database functionality will be disabled.")
    };
  } catch (error) {
    logger.error("Error initializing SQLite:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};

/**
 * Open database with the appropriate implementation
 */
export const openDatabase = async (name: string = DATABASE_NAME): Promise<any> => {
  try {
    // Check if we have a valid SQLite implementation
    if (!SQLiteImpl || typeof SQLiteImpl.openDatabase !== 'function') {
      const initResult = await initializeSQLite();
      if (!initResult.success) {
        throw initResult.error || new Error("SQLite not available");
      }
    }
    
    // Open the database
    logger.log(`Opening database: ${name}`);
    const db = SQLiteImpl.openDatabase(name);
    
    if (!db) {
      throw new Error(`Failed to open database: ${name}`);
    }
    
    return db;
  } catch (error) {
    logger.error(`Error opening database ${name}:`, error);
    throw error;
  }
};

/**
 * Check if the database exists (always returns true now that we don't use FileSystem)
 */
export const checkDatabaseExists = async (name: string = DATABASE_NAME): Promise<boolean> => {
  // Without FileSystem, we can't check if the file exists
  // We'll just return true and let SQLite handle the file creation
  return true;
};

/**
 * Log basic info for debugging
 */
export const logFileSystemInfo = async (): Promise<void> => {
  logger.log("Database configuration:", {
    name: DATABASE_NAME,
    platform: Platform.OS
  });
};