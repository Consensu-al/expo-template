# Consensual Expo Template

A modern Expo template with a robust stack for building React Native applications using best practices and high-performance libraries.

## Features

- 🧰 **Expo Router** - File-based routing with nested tabs and drawer navigation
- 🔄 **Zustand** - Simple, fast state management
- ✅ **Zod** - TypeScript-first schema validation
- 🗃️ **Drizzle with SQLite** - Type-safe database toolkit
- 🔐 **Expo Secure Store** - Secure local storage
- 🎨 **React Native Paper** - Material Design components and icons
- ⚡ **@shopify/flash-list** - High-performance lists
- 🧩 **@paralleldrive/cuid2** - Collision-resistant IDs
- 🔍 **Biome** - Fast linting and formatting

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

2. Start the app
   ```bash
   bun run start
   ```

3. Open on your preferred platform
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
├── db/                   # Database schema and client
│   ├── index.ts          # Database client setup
│   └── schema.ts         # Drizzle schema definitions
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
└── CLAUDE.md             # AI Assistant guidelines
```

## Included Features

- **Drawer Navigation** - Main navigation with hamburger menu
- **Tab Navigation** - Bottom tabs for main app sections
- **Dark Mode Support** - Automatic theme detection with React Native Paper
- **Database Integration** - SQLite with Drizzle ORM
- **State Management** - Zustand for global state
- **Form Validation** - Zod for schema validation
- **Optimized Lists** - FlashList for better performance

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

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Expo Router](https://docs.expo.dev/router/introduction/)