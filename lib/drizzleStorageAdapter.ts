import type { StateStorage } from "zustand/middleware";
import { eq } from "drizzle-orm";
import { getDb } from "../db/drizzle";
import { settingsTable } from "../db/schema";

/**
 * Creates a Drizzle storage adapter for Zustand persist middleware
 * This adapter stores Zustand state in the database using the settings table
 * 
 * @param namespace A unique namespace prefix for the store to avoid key collisions
 * @returns A StateStorage compatible adapter for Zustand
 */
// In-memory cache for faster access between operations
const memoryCache: Record<string, string> = {};

export const createDrizzleStorage = (namespace: string): StateStorage => {
  return {
    getItem: async (name: string): Promise<string | null> => {
      try {
        // First check memory cache for fastest access
        const cacheKey = `${namespace}-${name}`;
        if (memoryCache[cacheKey]) {
          return memoryCache[cacheKey];
        }
        
        // Get database instance
        const db = getDb();
        if (!db) {
          console.warn(`Database not initialized when getting ${namespace}-${name}`);
          return null;
        }
        
        // Construct the storage key
        const storeKey = `zustand-${namespace}-${name}`;
        
        // Query the database for the value
        const record = await db.select().from(settingsTable).where(eq(settingsTable.key, storeKey)).get();
        
        if (!record) {
          return null;
        }
        
        // Extract and normalize the value
        const value = typeof record.value === "string"
          ? record.value
          : JSON.stringify(record.value);
        
        // Cache the value in memory for faster access next time
        memoryCache[cacheKey] = value;
        
        return value;
      } catch (error) {
        console.error(`Error loading "${namespace}" store from database:`, error);
        return null;
      }
    },
    
    setItem: async (name: string, value: string): Promise<void> => {
      try {
        // Update memory cache first for immediate access
        const cacheKey = `${namespace}-${name}`;
        memoryCache[cacheKey] = value;
        
        // Get database instance
        const db = getDb();
        if (!db) {
          console.warn(`Database not initialized when setting ${namespace}-${name}`);
          return;
        }
        
        // Construct the storage key
        const storeKey = `zustand-${namespace}-${name}`;
        
        // Check if the record exists
        const existingRecord = await db
          .select()
          .from(settingsTable)
          .where(eq(settingsTable.key, storeKey))
          .get();
        
        if (existingRecord) {
          // Update existing record
          await db
            .update(settingsTable)
            .set({
              value,
              updatedAt: new Date().toISOString(),
            })
            .where(eq(settingsTable.key, storeKey));
        } else {
          // Insert new record
          await db
            .insert(settingsTable)
            .values({
              key: storeKey,
              value,
              updatedAt: new Date().toISOString(),
            });
        }
      } catch (error) {
        console.error(`Error saving "${namespace}" store to database:`, error);
      }
    },
    
    removeItem: async (name: string): Promise<void> => {
      try {
        // Remove from memory cache first
        const cacheKey = `${namespace}-${name}`;
        delete memoryCache[cacheKey];
        
        // Get database instance
        const db = getDb();
        if (!db) {
          console.warn(`Database not initialized when removing ${namespace}-${name}`);
          return;
        }
        
        // Construct the storage key
        const storeKey = `zustand-${namespace}-${name}`;
        
        // Delete the record
        await db
          .delete(settingsTable)
          .where(eq(settingsTable.key, storeKey));
      } catch (error) {
        console.error(`Error removing "${namespace}" store from database:`, error);
      }
    },
  };
};