import { 
  createDrizzleAdapter, 
  initializeLoggerSingleton,
  logger as singletonLogger 
} from "@consensu.al/react-native-logger";
import { db } from "@/db/index";

/**
 * Initializes the singleton logger with database access and configuration
 * @returns The singleton logger instance
 */
export function initializeLogger() {
  // Configuration options
  const options = {
    enabled: true,
    // Enable secure mode by default - this will redact sensitive information
    secureMode: true, 
    // In dev mode, show logs in console
    console: __DEV__,
  };
  
  try {
    // Create a Drizzle adapter using the global db instance
    const dbAdapter = createDrizzleAdapter(db);
    
    // Initialize the logger with the database adapter
    initializeLoggerSingleton(options, dbAdapter);
    console.log("Logger initialized with database persistence");
  } catch (error) {
    console.error("Failed to initialize logger with database:", error);
    // Fall back to default initialization
    initializeLoggerSingleton(options);
  }

  // Add a global error handler to catch unhandled errors
  if (!__DEV__) {
    const originalErrorHandler = ErrorUtils.getGlobalHandler();

    ErrorUtils.setGlobalHandler((error, isFatal) => {
      singletonLogger.error("Unhandled application error", {
        error: {
          message: error.message,
          stack: error.stack,
        },
        isFatal,
      });

      // Call the original handler
      originalErrorHandler(error, isFatal);
    });
  }

  return singletonLogger;
}

// Initialize the logger with default configuration
initializeLoggerSingleton({
  enabled: true,
  secureMode: true,
  console: __DEV__,
});

// Export the singleton logger
export { singletonLogger as logger };