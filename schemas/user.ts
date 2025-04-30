import { z } from "zod";

/**
 * Basic user schema
 */
export const userSchema = z.object({
  id: z.string().min(1).max(36),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  displayName: z.string().min(1).max(50).optional(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()).optional(),
  avatarUrl: z.string().url().optional().nullable(),
  preferences: z
    .object({
      darkMode: z.boolean().default(false),
      notifications: z.boolean().default(true),
      language: z.string().default("en"),
    })
    .optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// User type derived from schema
export type User = z.infer<typeof userSchema>;

/**
 * User creation input schema
 * Omits the ID field as it's auto-generated
 */
export const userCreateSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UserCreateInput = z.infer<typeof userCreateSchema>;

/**
 * User update input schema
 * Makes all fields optional except id
 */
export const userUpdateSchema = userSchema
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;

/**
 * User login input schema
 */
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional().default(false),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
