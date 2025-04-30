import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

/**
 * Todos table for storing simple to-do items
 * Used in the database example
 */
export const todosTable = sqliteTable("todos", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

/**
 * Zod schema for todos table rows
 */
export const TodoSchema = createSelectSchema(todosTable);
export type Todo = z.infer<typeof TodoSchema>;
