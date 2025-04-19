# Consensual Expo Template

A modern Expo template with a robust stack for building React Native applications using best practices and high-performance libraries.

## Features

- 🧰 **Expo Router** - File-based routing with nested tabs and drawer navigation
- 🔄 **Zustand** - Simple, fast state management
- ✅ **Zod** - TypeScript-first schema validation
- 🔐 **Expo Secure Store** - Secure local storage
- 🎨 **React Native Paper** - Material Design components and icons
- 📝 **@consensu.al/react-native-logger** - Structured logging with hooks support
- ⚡ **@shopify/flash-list** - High-performance lists
- 🧩 **@paralleldrive/cuid2** - Collision-resistant IDs
- 🔍 **Biome** - Fast linting and formatting
- 🌐 **Environment Variables** - Runtime configuration with Expo's EXPO_PUBLIC_ system

## Installation

```bash
bunx create-expo-app --template consensual-expo-template
```

## Getting Started

1. Install dependencies
   ```bash
   cd your-app-name
   bun install
   ```

2. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your own values.

3. Start the app
   ```bash
   bun run start
   ```

4. Open on your preferred platform
   ```bash
   # iOS
   bun run ios
   
   # Android
   bun run android
   
   # Web
   bun run web
   ```

## Project Structure

```
your-app/
├── app/                  # Main application code (Expo Router)
│   ├── (tabs)/           # Bottom tab navigator screens
│   │   ├── index.tsx     # Home screen
│   │   ├── explore.tsx   # Explore screen
│   │   └── profile.tsx   # Profile screen
│   ├── about/            # About screen (accessible via drawer)
│   ├── settings/         # Settings screen (accessible via drawer)
│   └── _layout.tsx       # Root layout with drawer navigator
├── assets/               # Static assets
├── components/           # Reusable components
├── constants/            # App constants
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
├── .env.example          # Example environment variables
├── .env                  # Your environment variables (gitignored)
└── CLAUDE.md             # AI Assistant guidelines
```

## Included Features

- **Drawer Navigation** - Main navigation with hamburger menu
- **Tab Navigation** - Bottom tabs for main app sections
- **Dark Mode Support** - Automatic theme detection with React Native Paper
- **State Management** - Zustand for global state
- **Form Validation** - Zod for schema validation
- **Optimized Lists** - FlashList for better performance
- **Structured Logging** - Consistent logging with react-native-logger
- **Environment Variables** - Runtime configuration using Expo's public vars
- **Feature Flags** - Toggle features via environment variables

## Development Commands

```bash
# Start development server
bun run start

# Run on iOS
bun run ios

# Run on Android
bun run android

# Run on Web
bun run web

# Run linting
bun run lint

# Run formatting
bun run format

# Run tests
bun run test
```

## Environment Configuration

The template uses environment variables for configuration, which are loaded from a `.env` file. This allows you to:

- Keep sensitive data out of your codebase
- Customize the app for different environments (dev, staging, production)
- Easily switch between different configurations

### Available Environment Variables

The template uses two types of environment variables:
1. **Build-time variables** - Used during app building only
2. **Runtime variables** - Accessible in your app code (prefixed with `EXPO_PUBLIC_`)

#### Build-time Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `EXPO_APP_NAME` | The display name of your app | Consensual Expo App |
| `EXPO_APP_SLUG` | The unique slug for your app on Expo | consensual-template |
| `EXPO_APP_VERSION` | The version of your app | 1.0.0 |
| `EXPO_APP_OWNER` | Your Expo account name | anonymous |
| `EXPO_PROJECT_ID` | Your Expo project ID | your-project-id |
| `EXPO_UPDATES_URL` | URL for Expo updates | https://u.expo.dev/your-project-id |
| `ANDROID_PACKAGE_NAME` | Android package name | com.consensual.template |
| `URL_SCHEME` | URL scheme for deep linking | consensual |

#### Runtime Variables (Client-accessible)

| Variable | Description | Default |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_URL` | API base URL | https://api.example.com |
| `EXPO_PUBLIC_DB_NAME` | Database file name | app.db |
| `EXPO_PUBLIC_ENABLE_ANALYTICS` | Enable analytics | false |
| `EXPO_PUBLIC_ENABLE_CRASH_REPORTING` | Enable crash reporting | false |
| `EXPO_PUBLIC_LOG_LEVEL` | Logging level (debug, info, warn, error) | debug (dev) or info (prod) |
| `EXPO_PUBLIC_ENVIRONMENT` | Current environment | development or production |

### Accessing Environment Variables in Code

Environment variables can be accessed in your app using the `Env` constant:

```typescript
import { Env } from '@/constants/Env';

// App information
console.log(Env.app.name);      // App name
console.log(Env.app.version);   // App version
console.log(Env.isDevelopment); // Whether running in dev mode

// Configuration
console.log(Env.api.baseUrl);   // API URL
console.log(Env.db.name);       // Database name
console.log(Env.environment);   // Current environment

// Feature flags
console.log(Env.features.enableAnalytics);      // Analytics enabled
console.log(Env.features.enableCrashReporting); // Crash reporting enabled

// Logger configuration
console.log(Env.logger.level);  // Log level
```

### Environment Files

The template supports different environment files:

```
.env                # Default environment, used in all builds
.env.local          # Local overrides (not committed to git)
.env.development    # Development environment
.env.production     # Production environment
```

Environment-specific files take precedence over the default `.env` file when the corresponding environment is active.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [@consensu.al/react-native-logger](https://github.com/consensual/react-native-logger)