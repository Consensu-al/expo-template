import Constants from "expo-constants";

/**
 * Type definitions for environment variables
 */
type EnvType = {
  app: {
    name: string;
    version: string;
    slug: string;
    scheme: string;
  };
  project: {
    id: string;
  };
  db: {
    name: string;
  };
  api: {
    baseUrl: string;
  };
  features: {
    enableAnalytics: boolean;
    enableCrashReporting: boolean;
  };
  logger: {
    level: string;
  };
  environment: string;
  isDevelopment: boolean;
};

// Extract values from Constants with fallbacks
const extra = Constants.expoConfig?.extra || {};

/**
 * Environment variables and configuration values accessible throughout the app
 */
export const Env: EnvType = {
  /**
   * App information
   */
  app: {
    name: Constants.expoConfig?.name || "Consensual App",
    version: Constants.expoConfig?.version || "1.0.0",
    slug: Constants.expoConfig?.slug || "consensual-app",
    scheme: Constants.expoConfig?.scheme as string,
  },

  /**
   * Project identifiers
   */
  project: {
    id: extra.eas?.projectId || "",
  },

  /**
   * Database settings
   */
  db: {
    name: extra.dbName || "app.db",
  },

  /**
   * Server URLs for API interactions
   */
  api: {
    baseUrl: extra.apiUrl || "https://api.example.com",
  },

  /**
   * Feature flags
   */
  features: {
    enableAnalytics: extra.enableAnalytics === true,
    enableCrashReporting: extra.enableCrashReporting === true,
  },

  /**
   * Logger configuration
   */
  logger: {
    level: extra.logLevel || "info",
  },

  /**
   * Current environment (development, staging, production)
   */
  environment: extra.environment || "production",

  /**
   * Whether the app is running in development mode
   * Default to false for production builds
   */
  isDevelopment: false,
};
