/**
 * Generated schema file for @consensu.al/react-native-logger
 * Created on 2025-04-26T20:28:57.423Z
 * 
 * This file can be imported into your main Drizzle schema to include the logging table
 */

import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Application logs table schema
 * Import this into your main Drizzle schema file
 */
export const appLogsTable = sqliteTable('app_logs', {
  id: text('id')
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
  level: text('level').notNull(), // 'debug', 'info', 'warn', 'error'
  message: text('message').notNull(),
  metadata: text('metadata'), // JSON stringified metadata
});

// Alias for backward compatibility if you're upgrading from an older version
export const logsTable = appLogsTable;
