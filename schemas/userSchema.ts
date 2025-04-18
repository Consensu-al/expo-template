import { z } from 'zod';

// User profile validation schema
export const userProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username cannot exceed 30 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  displayName: z
    .string()
    .min(1, { message: 'Display name is required' })
    .max(50, { message: 'Display name cannot exceed 50 characters' })
    .optional(),
  bio: z
    .string()
    .max(200, { message: 'Bio cannot exceed 200 characters' })
    .optional(),
  settings: z.object({
    darkMode: z.boolean().default(false),
    notificationsEnabled: z.boolean().default(true),
    language: z.string().default('en'),
  }),
});

// Define the type from the schema
export type UserProfile = z.infer<typeof userProfileSchema>;

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean().default(false),
});

// Define the type from the schema
export type LoginForm = z.infer<typeof loginSchema>;

// Registration form validation schema
export const registrationSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username cannot exceed 30 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the terms and conditions' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Define the type from the schema
export type RegistrationForm = z.infer<typeof registrationSchema>;