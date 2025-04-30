# Consensual Expo Template

A modern Expo template with a robust stack for building React Native applications using best practices and high-performance libraries.

## Features

- 🧰 **Expo Router** - File-based routing with nested tabs and drawer navigation
- 🔄 **Zustand** - Simple, fast state management
- ✅ **Zod** - TypeScript-first schema validation
- 🔐 **Expo Secure Store** - Secure local storage
- 🎨 **React Native Paper** - Material Design components and icons
- 💾 **Drizzle ORM** - SQLite database with type-safe queries
- ⚡ **@shopify/flash-list** - High-performance lists
- 🧩 **@paralleldrive/cuid2** - Collision-resistant IDs
- 🔍 **Biome** - Fast linting and formatting
- 📄 **Markdown Rendering** - Build-time markdown to component conversion
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
│   │   └── explore.tsx   # Explore screen
│   ├── about/            # About screen (accessible via drawer)
│   ├── examples/         # Example screens
│   ├── settings/         # Settings screen (accessible via drawer)
│   └── _layout.tsx       # Root layout with drawer navigator
├── assets/               # Static assets
│   ├── fonts/            # Custom fonts
│   ├── images/           # App icons and images
│   ├── markdown/         # Markdown content files
│   └── generated/        # Auto-generated content
├── components/           # Reusable components
│   ├── examples/         # Example components
│   ├── forms/            # Form components
│   └── ui/               # UI components
├── constants/            # App constants
├── contexts/             # React contexts
├── db/                   # Database configuration
│   ├── migrations/       # Database migrations
│   └── schema.ts         # Database schema
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── schemas/              # Zod validation schemas 
├── scripts/              # Build and utility scripts
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
- **Database Support** - SQLite persistence with Drizzle ORM
- **Environment Variables** - Runtime configuration using Expo's public vars
- **Feature Flags** - Toggle features via environment variables
- **Markdown Rendering** - Convert markdown files to React Native components

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

# Generate markdown components
bun run generate-content
```

## Markdown Rendering

The template includes a build-time markdown-to-component conversion system that allows you to:

- Convert markdown files to React Native components
- Display rich formatted content with proper styling
- Support for code blocks with syntax highlighting
- Proper theme support for both light and dark mode
- Tables, lists, links, and other markdown elements

Markdown files are processed during build time, which means:

1. No runtime parsing overhead
2. Type-safe components 
3. Optimized for performance

To add a new markdown file to be converted:

1. Add your markdown file to `/assets/markdown/`
2. Update the `MARKDOWN_SOURCES` array in `/scripts/generate-markdown-components.js`
3. Run `bun run generate-content`

The generated components can be imported and used with theme support:

```tsx
import { ReadmeContent } from '@/assets/generated/ReadmeContent';
// or import { ExampleMarkdownContent } from '@/assets/generated/ExampleMarkdownContent';

function MyScreen() {
  const theme = useTheme();
  return <ReadmeContent theme={theme} />;
}
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

## Example Screens

The template includes several example screens to help you get started:

- **Database Example** - CRUD operations with Drizzle ORM and SQLite
- **Validation Example** - Form validation using Zod schemas
- **Zustand Example** - State management with persistence
- **Markdown Example** - Rendering markdown content with theme support

These examples demonstrate best practices for common tasks in React Native apps. They can be accessed from the Examples section in the app.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Zod Validation](https://zod.dev/)
- [FlashList](https://shopify.github.io/flash-list/)