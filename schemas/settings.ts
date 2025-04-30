import { z } from "zod";

/**
 * Application settings schema
 */
export const settingsSchema = z.object({
  appearance: z.object({
    theme: z.enum(["light", "dark", "system"]).default("system"),
    fontSize: z.enum(["small", "normal", "large", "extra-large"]).default("normal"),
    reducedMotion: z.boolean().default(false),
    contrastLevel: z.enum(["normal", "high"]).default("normal"),
  }),

  notifications: z.object({
    enabled: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    emailNotifications: z.boolean().default(true),
    marketingCommunications: z.boolean().default(false),
    sounds: z.boolean().default(true),
    vibration: z.boolean().default(true),
  }),

  privacy: z.object({
    dataCollection: z.boolean().default(true),
    crashReporting: z.boolean().default(true),
    analytics: z.boolean().default(true),
    locationTracking: z.boolean().default(false),
    deviceInfo: z.boolean().default(true),
    personalization: z.boolean().default(true),
  }),

  security: z.object({
    biometricAuth: z.boolean().default(false),
    rememberLoginSession: z.boolean().default(true),
    autoLockTimeout: z.number().int().min(0).max(60).default(5), // minutes
    requireFullAuthentication: z.boolean().default(false),
  }),

  sync: z.object({
    autoSync: z.boolean().default(true),
    syncOnWifiOnly: z.boolean().default(false),
    syncFrequency: z.enum(["realtime", "hourly", "daily", "manual"]).default("realtime"),
    lastSyncedAt: z
      .union([
        z.date(),
        z.string().transform((val) => new Date(val)),
        z.null()
      ])
      .optional()
      .nullable()
      .transform((val) => val instanceof Date ? val : val && typeof val === 'string' ? new Date(val) : null),
  }),

  performance: z.object({
    enableHardwareAcceleration: z.boolean().default(true),
    offlineMode: z.boolean().default(false),
    cacheImages: z.boolean().default(true),
    lowDataMode: z.boolean().default(false),
  }),

  advanced: z.object({
    developerMode: z.boolean().default(false),
    verboseLogging: z.boolean().default(false),
    resetOnNextLaunch: z.boolean().default(false),
    experimentalFeatures: z.boolean().default(false),
  }),

  // We don't need to store version in settings as it's read from Constants
  // Handle lastUpdated as either a Date object or ISO string (which will be parsed into a Date)
  lastUpdated: z
    .union([
      z.date(),
      z.string().transform((val) => new Date(val))
    ])
    .optional()
    .transform((val) => val instanceof Date ? val : val ? new Date(val) : undefined),
});

// Settings type derived from schema
export type Settings = z.infer<typeof settingsSchema>;

/**
 * Default settings conforming to the schema
 */
export const defaultSettings: Settings = {
  appearance: {
    theme: "system",
    fontSize: "normal",
    reducedMotion: false,
    contrastLevel: "normal",
  },

  notifications: {
    enabled: true,
    pushNotifications: true,
    emailNotifications: true,
    marketingCommunications: false,
    sounds: true,
    vibration: true,
  },

  privacy: {
    dataCollection: true,
    crashReporting: true,
    analytics: true,
    locationTracking: false,
    deviceInfo: true,
    personalization: true,
  },

  security: {
    biometricAuth: false,
    rememberLoginSession: true,
    autoLockTimeout: 5,
    requireFullAuthentication: false,
  },

  sync: {
    autoSync: true,
    syncOnWifiOnly: false,
    syncFrequency: "realtime",
    lastSyncedAt: null,
  },

  performance: {
    enableHardwareAcceleration: true,
    offlineMode: false,
    cacheImages: true,
    lowDataMode: false,
  },

  advanced: {
    developerMode: false,
    verboseLogging: false,
    resetOnNextLaunch: false,
    experimentalFeatures: false,
  },

  lastUpdated: new Date(),
};
