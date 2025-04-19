// Load environment variables
require("dotenv").config();

module.exports = {
  expo: {
    name: process.env.EXPO_APP_NAME || "Consensual Expo App",
    slug: process.env.EXPO_APP_SLUG || "consensual-template",
    version: process.env.EXPO_APP_VERSION || "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    owner: process.env.EXPO_APP_OWNER || "anonymous",
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: process.env.EXPO_UPDATES_URL || "https://u.expo.dev/your-project-id",
      enabled: true,
    },
    scheme: process.env.URL_SCHEME || "consensual",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: process.env.ANDROID_PACKAGE_NAME || "com.consensual.template",
      permissions: [],
      jsEngine: "hermes",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      // Expose environment variables to the app
      router: {
        origin: false,
      },
      // App identifiers
      eas: {
        projectId: process.env.EXPO_PROJECT_ID || "your-project-id",
      },
      // API configuration
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
      // Database configuration
      dbName: process.env.EXPO_PUBLIC_DB_NAME || "app.db",
      // Feature flags
      enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === "true",
      enableCrashReporting: process.env.EXPO_PUBLIC_ENABLE_CRASH_REPORTING === "true",
      // Logger configuration
      logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL || (__DEV__ ? "debug" : "info"),
      // Environment indicator
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || (__DEV__ ? "development" : "production"),
    },
  },
};
