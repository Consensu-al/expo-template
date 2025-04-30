
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * ReadmeContent
 * 
 * Auto-generated from markdown content.
 * This component renders the markdown content with theme-aware styling.
 */
export default function ReadmeContent({ theme }) {
  // Theme-specific code styling

  // Apply theme colors to styles
  const themedStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    heading1: {
      color: theme.colors.onBackground,
    },
    heading2: {
      color: theme.colors.onBackground,
    },
    heading3: {
      color: theme.colors.onBackground,
    },
    heading4: {
      color: theme.colors.onBackground,
    },
    heading5: {
      color: theme.colors.onBackground,
    },
    heading6: {
      color: theme.colors.onBackground,
    },
    paragraph: {
      color: theme.colors.onBackground,
    },
    link: {
      color: theme.colors.primary,
    },
    strong: {
      color: theme.colors.onBackground,
    },
    italic: {
      color: theme.colors.onBackground,
    },
    listItemText: {
      color: theme.colors.onBackground,
    },
    listItemBullet: {
      color: theme.colors.primary,
    },
    code: {
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.onSurfaceVariant,
    },
    codeBlockContainer: {
      backgroundColor: theme.dark ? '#1e1e1e' : '#f5f5f5',
    },
    codeBlock: {
      backgroundColor: theme.dark ? '#1e1e1e' : '#f5f5f5',
    },
    codeBlockText: {
      color: theme.dark ? '#f8f8f2' : '#24292e',
    },
    blockquoteText: {
      color: theme.colors.secondary,
    },
    divider: {
      backgroundColor: theme.colors.outlineVariant,
    },
    table: {
      borderColor: theme.dark ? '#555' : '#e0e0e0',
    },
    tableRow: {
      borderBottomColor: theme.dark ? '#555' : '#e0e0e0',
    },
    tableHeaderCell: {
      backgroundColor: theme.dark ? '#333' : '#f5f5f5',
    },
    tableCell: {
      backgroundColor: theme.colors.background,
    },
    tableHeaderText: {
      color: theme.colors.onBackground,
    },
    tableCellText: {
      color: theme.colors.onBackground,
    },
  };
  
  return (
    <View style={[styles.container, themedStyles.container]}>
      <Text style={styles.heading1}>Consensual Expo Template</Text>
<Text style={styles.paragraph}>A modern Expo template with a robust stack for building React Native applications using best practices and high-performance libraries.</Text>
<Text style={styles.heading2}>Features</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🧰 <Text style={styles.strong}>Expo Router</Text> - File-based routing with nested tabs and drawer navigation</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🔄 <Text style={styles.strong}>Zustand</Text> - Simple, fast state management</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>✅ <Text style={styles.strong}>Zod</Text> - TypeScript-first schema validation</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🔐 <Text style={styles.strong}>Expo Secure Store</Text> - Secure local storage</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🎨 <Text style={styles.strong}>React Native Paper</Text> - Material Design components and icons</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>💾 <Text style={styles.strong}>Drizzle ORM</Text> - SQLite database with type-safe queries</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>⚡ <Text style={styles.strong}>@shopify/flash-list</Text> - High-performance lists</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🧩 <Text style={styles.strong}>@paralleldrive/cuid2</Text> - Collision-resistant IDs</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🔍 <Text style={styles.strong}>Biome</Text> - Fast linting and formatting</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>📄 <Text style={styles.strong}>Markdown Rendering</Text> - Build-time markdown to component conversion</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>🌐 <Text style={styles.strong}>Environment Variables</Text> - Runtime configuration with Expo's EXPO_PUBLIC_ system</Text></View>
</View>
<Text style={styles.heading2}>Installation</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>bunx create-expo-app --template consensual-expo-template</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading2}>Getting Started</Text>
<View style={styles.orderedList}>
<View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}><Text style={styles.paragraph}>Install dependencies</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>cd your-app-name</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>bun install</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}> </Text>
          </View>
        </ScrollView>
      </View>
</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}><Text style={styles.paragraph}>Set up environment variables</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>cp .env.example .env</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.paragraph}>Then edit <Text selectable={true} style={styles.code}>&#46;env</Text> with your own values.</Text>
</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}><Text style={styles.paragraph}>Start the app</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>bun run start</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}> </Text>
          </View>
        </ScrollView>
      </View>
</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}><Text style={styles.paragraph}>Open on your preferred platform</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}># iOS</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>bun run ios</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}># Android</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}>bun run android</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}># Web</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-7"}>bun run web</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-8"}> </Text>
          </View>
        </ScrollView>
      </View>
</Text></View>
</View>
<Text style={styles.heading2}>Project Structure</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>your-app/</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>├── app/                  # Main application code (Expo Router)</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}>│   ├── (tabs)/           # Bottom tab navigator screens</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}>│   │   ├── index.tsx     # Home screen</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}>│   │   └── explore.tsx   # Explore screen</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}>│   ├── about/            # About screen (accessible via drawer)</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}>│   ├── examples/         # Example screens</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-7"}>│   ├── settings/         # Settings screen (accessible via drawer)</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-8"}>│   └── _layout.tsx       # Root layout with drawer navigator</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-9"}>├── assets/               # Static assets</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-10"}>│   ├── fonts/            # Custom fonts</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-11"}>│   ├── images/           # App icons and images</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-12"}>│   ├── markdown/         # Markdown content files</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-13"}>│   └── generated/        # Auto-generated content</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-14"}>├── components/           # Reusable components</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-15"}>│   ├── examples/         # Example components</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-16"}>│   ├── forms/            # Form components</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-17"}>│   └── ui/               # UI components</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-18"}>├── constants/            # App constants</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-19"}>├── contexts/             # React contexts</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-20"}>├── db/                   # Database configuration</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-21"}>│   ├── migrations/       # Database migrations</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-22"}>│   └── schema.ts         # Database schema</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-23"}>├── hooks/                # Custom React hooks</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-24"}>├── lib/                  # Utility functions</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-25"}>├── schemas/              # Zod validation schemas </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-26"}>├── scripts/              # Build and utility scripts</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-27"}>├── stores/               # Zustand stores</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-28"}>├── .env.example          # Example environment variables</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-29"}>├── .env                  # Your environment variables (gitignored)</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-30"}>└── CLAUDE.md             # AI Assistant guidelines</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-31"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading2}>Included Features</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Drawer Navigation</Text> - Main navigation with hamburger menu</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Tab Navigation</Text> - Bottom tabs for main app sections</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Dark Mode Support</Text> - Automatic theme detection with React Native Paper</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>State Management</Text> - Zustand for global state</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Form Validation</Text> - Zod for schema validation</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Optimized Lists</Text> - FlashList for better performance</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Database Support</Text> - SQLite persistence with Drizzle ORM</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Environment Variables</Text> - Runtime configuration using Expo's public vars</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Feature Flags</Text> - Toggle features via environment variables</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Markdown Rendering</Text> - Convert markdown files to React Native components</Text></View>
</View>
<Text style={styles.heading2}>Development Commands</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}># Start development server</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>bun run start</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}># Run on iOS</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}>bun run ios</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}># Run on Android</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-7"}>bun run android</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-8"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-9"}># Run on Web</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-10"}>bun run web</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-11"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-12"}># Run linting</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-13"}>bun run lint</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-14"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-15"}># Run formatting</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-16"}>bun run format</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-17"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-18"}># Run tests</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-19"}>bun run test</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-20"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-21"}># Generate markdown components</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-22"}>bun run generate-content</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-23"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading2}>Markdown Rendering</Text>
<Text style={styles.paragraph}>The template includes a build-time markdown-to-component conversion system that allows you to:</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Convert markdown files to React Native components</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Display rich formatted content with proper styling</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Support for code blocks with syntax highlighting</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Proper theme support for both light and dark mode</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Tables, lists, links, and other markdown elements</Text></View>
</View>
<Text style={styles.paragraph}>Markdown files are processed during build time, which means:</Text>
<View style={styles.orderedList}>
<View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>No runtime parsing overhead</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>Type-safe components </Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>Optimized for performance</Text></View>
</View>
<Text style={styles.paragraph}>To add a new markdown file to be converted:</Text>
<View style={styles.orderedList}>
<View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>Add your markdown file to <Text selectable={true} style={styles.code}>/assets/markdown/</Text></Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>Update the <Text selectable={true} style={styles.code}>MARKDOWN_SOURCES</Text> array in <Text selectable={true} style={styles.code}>/scripts/generate-markdown-components&#46;js</Text></Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>Run <Text selectable={true} style={styles.code}>bun run generate-content</Text></Text></View>
</View>
<Text style={styles.paragraph}>The generated components can be imported and used with theme support:</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>import &#123; ReadmeContent &#125; from &#39;@/assets/generated/ReadmeContent&#39;;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>// or import &#123; ExampleMarkdownContent &#125; from &#39;@/assets/generated/ExampleMarkdownContent&#39;;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}>function MyScreen() &#123;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}>  const theme = useTheme();</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}>  return &lt;ReadmeContent theme=&#123;theme&#125; /&gt;;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}>&#125;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-7"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading2}>Environment Configuration</Text>
<Text style={styles.paragraph}>The template uses environment variables for configuration, which are loaded from a <Text selectable={true} style={styles.code}>&#46;env</Text> file. This allows you to:</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Keep sensitive data out of your codebase</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Customize the app for different environments (dev, staging, production)</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Easily switch between different configurations</Text></View>
</View>
<Text style={styles.heading3}>Available Environment Variables</Text>
<Text style={styles.paragraph}>The template uses two types of environment variables:</Text>
<View style={styles.orderedList}>
<View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}><Text style={styles.strong}>Build-time variables</Text> - Used during app building only</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}><Text style={styles.strong}>Runtime variables</Text> - Accessible in your app code (prefixed with <Text selectable={true} style={styles.code}>EXPO_PUBLIC_</Text>)</Text></View>
</View>
<Text style={styles.heading4}>Build-time Variables</Text>
<View style={[styles.table, themedStyles.table]}>

<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Variable</Text></View>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Description</Text></View>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Default</Text></View>
</View>

<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_APP_NAME</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>The display name of your app</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Consensual Expo App</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_APP_SLUG</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>The unique slug for your app on Expo</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>consensual-template</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_APP_VERSION</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>The version of your app</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>1.0.0</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_APP_OWNER</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Your Expo account name</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>anonymous</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PROJECT_ID</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Your Expo project ID</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>your-project-id</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_UPDATES_URL</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>URL for Expo updates</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><TouchableOpacity onPress={() => Linking.openURL("https://u.expo.dev/your-project-id")}><Text style={styles.link}>https://u.expo.dev/your-project-id</Text></TouchableOpacity></Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>ANDROID_PACKAGE_NAME</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Android package name</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>com.consensual.template</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>URL_SCHEME</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>URL scheme for deep linking</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>consensual</Text></View>
</View>
</View>
<Text style={styles.heading4}>Runtime Variables (Client-accessible)</Text>
<View style={[styles.table, themedStyles.table]}>

<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Variable</Text></View>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Description</Text></View>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Default</Text></View>
</View>

<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PUBLIC_API_URL</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>API base URL</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><TouchableOpacity onPress={() => Linking.openURL("https://api.example.com")}><Text style={styles.link}>https://api.example.com</Text></TouchableOpacity></Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PUBLIC_DB_NAME</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Database file name</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>app.db</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PUBLIC_ENABLE_ANALYTICS</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Enable analytics</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>false</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PUBLIC_ENABLE_CRASH_REPORTING</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Enable crash reporting</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>false</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PUBLIC_LOG_LEVEL</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Logging level (debug, info, warn, error)</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>debug (dev) or info (prod)</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}><Text selectable={true} style={styles.code}>EXPO_PUBLIC_ENVIRONMENT</Text></Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Current environment</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>development or production</Text></View>
</View>
</View>
<Text style={styles.heading3}>Accessing Environment Variables in Code</Text>
<Text style={styles.paragraph}>Environment variables can be accessed in your app using the <Text selectable={true} style={styles.code}>Env</Text> constant:</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>import &#123; Env &#125; from &#39;@/constants/Env&#39;;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}>// App information</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}>console.log(Env.app.name);      // App name</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}>console.log(Env.app.version);   // App version</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}>console.log(Env.isDevelopment); // Whether running in dev mode</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-7"}>// Configuration</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-8"}>console.log(Env.api.baseUrl);   // API URL</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-9"}>console.log(Env.db.name);       // Database name</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-10"}>console.log(Env.environment);   // Current environment</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-11"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-12"}>// Feature flags</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-13"}>console.log(Env.features.enableAnalytics);      // Analytics enabled</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-14"}>console.log(Env.features.enableCrashReporting); // Crash reporting enabled</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-15"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-16"}>// Logger configuration</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-17"}>console.log(Env.logger.level);  // Log level</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-18"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading3}>Environment Files</Text>
<Text style={styles.paragraph}>The template supports different environment files:</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>.env                # Default environment, used in all builds</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>.env.local          # Local overrides (not committed to git)</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}>.env.development    # Development environment</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}>.env.production     # Production environment</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.paragraph}>Environment-specific files take precedence over the default <Text selectable={true} style={styles.code}>&#46;env</Text> file when the corresponding environment is active.</Text>
<Text style={styles.heading2}>Example Screens</Text>
<Text style={styles.paragraph}>The template includes several example screens to help you get started:</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Database Example</Text> - CRUD operations with Drizzle ORM and SQLite</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Validation Example</Text> - Form validation using Zod schemas</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Zustand Example</Text> - State management with persistence</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Markdown Example</Text> - Rendering markdown content with theme support</Text></View>
</View>
<Text style={styles.paragraph}>These examples demonstrate best practices for common tasks in React Native apps. They can be accessed from the Examples section in the app.</Text>
<Text style={styles.heading2}>Learn More</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://docs.expo.dev/")}><Text style={styles.link}>Expo Documentation</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://reactnativepaper.com/")}><Text style={styles.link}>React Native Paper</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://github.com/pmndrs/zustand")}><Text style={styles.link}>Zustand</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://orm.drizzle.team/")}><Text style={styles.link}>Drizzle ORM</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://docs.expo.dev/router/introduction/")}><Text style={styles.link}>Expo Router</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://docs.expo.dev/guides/environment-variables/")}><Text style={styles.link}>Expo Environment Variables</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://zod.dev/")}><Text style={styles.link}>Zod Validation</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://shopify.github.io/flash-list/")}><Text style={styles.link}>FlashList</Text></TouchableOpacity></Text></View>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  heading2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 14,
  },
  heading3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  heading4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  heading5: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  heading6: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
  },
  strong: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    textDecorationLine: 'underline',
  },
  list: {
    marginVertical: 8,
    marginLeft: 8,
  },
  orderedList: {
    marginVertical: 8,
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  listItemBullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  listItemNumber: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
    minWidth: 20,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  code: {
    fontFamily: 'monospace',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  codeBlockContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  codeBlockScroll: {
    maxHeight: 300,
  },
  codeBlock: {
    padding: 16,
    paddingHorizontal: 12,
    flexDirection: 'column',
  },
  codeBlockText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 2,
  },
  blockquote: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginVertical: 8,
    borderLeftColor: '#ccc',
  },
  blockquoteText: {
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  // Table styles
  table: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCellText: {
    fontSize: 14,
  },
});
