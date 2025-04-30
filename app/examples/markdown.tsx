import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Text, useTheme, Button, TextInput } from "react-native-paper";

// Import the generated ExampleMarkdownContent component 
let ExampleMarkdownContent;
try {
  ExampleMarkdownContent = require("@/assets/generated/ExampleMarkdownContent").default;
} catch (error) {
  // Fallback if the component hasn't been generated yet
  const PlaceholderContent = ({ theme }) => (
    <View style={{ padding: 20 }}>
      <View style={{ 
        padding: 16, 
        backgroundColor: theme.colors.errorContainer,
        borderRadius: 8,
      }}>
        <Text style={{ 
          color: theme.colors.onErrorContainer,
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 8,
        }}>
          Markdown content not generated
        </Text>
        <Text style={{ color: theme.colors.onErrorContainer }}>
          The build-time content generation hasn't been run yet.
          Please run:
        </Text>
        <Text style={{ 
          fontFamily: 'monospace',
          backgroundColor: theme.colors.surfaceVariant,
          color: theme.colors.onSurfaceVariant,
          padding: 8,
          marginVertical: 8,
          borderRadius: 4,
        }}>
          bun run generate-content
        </Text>
        <Text style={{ color: theme.colors.onErrorContainer }}>
          This will transform markdown files into React Native components.
        </Text>
      </View>
    </View>
  );
  ExampleMarkdownContent = PlaceholderContent;
}

export default function MarkdownScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("rendered");

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Markdown Rendering Example
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          This example shows how to render markdown content in a React Native app.
        </Text>
      </View>

      <View style={styles.tabs}>
        <Button
          mode={activeTab === "rendered" ? "contained" : "outlined"}
          onPress={() => setActiveTab("rendered")}
          style={styles.tabButton}
        >
          Rendered Content
        </Button>
        <Button
          mode={activeTab === "info" ? "contained" : "outlined"}
          onPress={() => setActiveTab("info")}
          style={styles.tabButton}
        >
          How It Works
        </Button>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === "rendered" ? (
          <ExampleMarkdownContent theme={theme} />
        ) : (
          <View style={styles.infoContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
              Build-time Markdown Rendering
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              This example demonstrates how to convert Markdown content into React Native components at build time.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
              How It Works
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              1. Use the 'marked' library to parse markdown files
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              2. Convert HTML to JSX components with React Native elements
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              3. Handle special elements like code blocks, tables, and links
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              4. Apply theme-aware styling for both light and dark modes
            </Text>
            
            <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
              Implementation
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              The implementation uses a build script that runs before the app builds. The script:
            </Text>
            <View style={[styles.codeBlock, { backgroundColor: theme.dark ? '#1e1e1e' : '#f5f5f5' }]}>
              <Text selectable={true} style={[styles.code, { color: theme.dark ? '#f8f8f2' : '#24292e' }]}>
                # In package.json:
                "scripts": {"{"}
                  "generate-content": "node scripts/generate-markdown-components.js",
                  "prebuild": "node scripts/generate-markdown-components.js && expo prebuild"
                {"}"}
              </Text>
            </View>
            
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              The generation script handles:
            </Text>
            <Text style={[styles.bullet, { color: theme.colors.onBackground }]}>
              • Converting markdown to HTML with marked
            </Text>
            <Text style={[styles.bullet, { color: theme.colors.onBackground }]}>
              • Converting HTML to JSX compatible with React Native
            </Text>
            <Text style={[styles.bullet, { color: theme.colors.onBackground }]}>
              • Processing code blocks with proper formatting
            </Text>
            <Text style={[styles.bullet, { color: theme.colors.onBackground }]}>
              • Handling tables, lists, images, and links
            </Text>
            <Text style={[styles.bullet, { color: theme.colors.onBackground }]}>
              • Ensuring theme compatibility for dark mode
            </Text>
            
            <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
              Usage
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.onBackground }]}>
              To use this in your own app:
            </Text>
            <View style={[styles.codeBlock, { backgroundColor: theme.dark ? '#1e1e1e' : '#f5f5f5' }]}>
              <Text selectable={true} style={[styles.code, { color: theme.dark ? '#f8f8f2' : '#24292e' }]}>
                // 1. Install dependencies
                bun add marked
                
                // 2. Add the script to your project
                // See scripts/generate-markdown-components.js
                
                // 3. Update package.json scripts
                
                // 4. Use the generated component in your app
                import ReadmeContent from "@/assets/generated/ReadmeContent";
                
                function MyScreen() {"{"}
                  const theme = useTheme();
                  return <ReadmeContent theme={theme} />;
                {"}"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  infoContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 12,
    lineHeight: 18,
  },
});