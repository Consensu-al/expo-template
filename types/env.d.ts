/// <reference types="node" />

// Extend the Node.js namespace with our EXPO_PUBLIC_ environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    // API configuration
    EXPO_PUBLIC_API_URL?: string;

    // Database configuration
    EXPO_PUBLIC_DB_NAME?: string;

    // Feature flags
    EXPO_PUBLIC_ENABLE_ANALYTICS?: string;
    EXPO_PUBLIC_ENABLE_CRASH_REPORTING?: string;

    // Logger configuration
    EXPO_PUBLIC_LOG_LEVEL?: "debug" | "info" | "warn" | "error";

    // Environment indicator
    EXPO_PUBLIC_ENVIRONMENT?: "development" | "staging" | "production";
  }
}

// For accessing process.env directly in app code (when needed)
declare const process: {
  env: {
    // API configuration
    EXPO_PUBLIC_API_URL?: string;

    // Database configuration
    EXPO_PUBLIC_DB_NAME?: string;

    // Feature flags
    EXPO_PUBLIC_ENABLE_ANALYTICS?: string;
    EXPO_PUBLIC_ENABLE_CRASH_REPORTING?: string;

    // Logger configuration
    EXPO_PUBLIC_LOG_LEVEL?: "debug" | "info" | "warn" | "error";

    // Environment indicator
    EXPO_PUBLIC_ENVIRONMENT?: "development" | "staging" | "production";

    // Always defined
    NODE_ENV: "development" | "production";
  };
};
