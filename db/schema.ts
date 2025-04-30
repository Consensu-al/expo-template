import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Settings table for storing application settings
 * 
 * This table is designed to store key-value pairs in a generic way,
 * allowing settings to be added without changing the table structure.
 * - key: unique identifier for the setting
 * - value: JSON string containing the setting value
 * - updatedAt: timestamp of when the setting was last updated
 */
export const settingsTable = sqliteTable('settings', {
  id: text('id')
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value', { mode: 'json' }).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
});

/**
 * Zod schema for settings table rows
 * Used for type safety when selecting from the database
 */
export const DbSettingSchema = createSelectSchema(settingsTable);
