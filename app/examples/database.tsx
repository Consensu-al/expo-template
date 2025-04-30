import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import DatabaseExample from "@/components/examples/DatabaseExample";
import AsyncStorageExample from "@/components/examples/AsyncStorageExample";
import DatabaseDebug from "@/components/examples/DatabaseDebug";

export default function DatabaseExampleScreen() {
  const theme = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen options={{ title: "Database Example" }} />
      
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.onBackground }]}
      >
        Database Integration
      </Text>
      
      <Text 
        variant="bodyLarge" 
        style={[styles.description, { color: theme.colors.onBackground }]}
      >
        This example demonstrates how to use the database in your app with a 
        generic key-value pattern that allows adding settings without 
        changing the database schema. The implementation uses:
      </Text>
      
      <Text 
        variant="bodyMedium" 
        style={[styles.bulletPoints, { color: theme.colors.onBackground }]}
      >
        • Drizzle ORM for type-safe database access{"\n"}
        • Zustand for state management{"\n"}
        • SQLite for persistent storage{"\n"}
        • AsyncStorage for state persistence{"\n"}
        • Key-value pattern for flexible schema{"\n"}
        • Zod for validation
      </Text>
      
      <DatabaseExample />
      
      <Divider style={styles.divider} />
      
      <Text 
        variant="titleLarge" 
        style={[styles.subtitle, { color: theme.colors.onBackground }]}
      >
        Zustand Persistence with AsyncStorage
      </Text>
      
      <Text 
        variant="bodyLarge" 
        style={[styles.description, { color: theme.colors.onBackground }]}
      >
        This example shows how to use Zustand's persist middleware with 
        AsyncStorage for reliable cross-platform persistence:
      </Text>
      
      <AsyncStorageExample />
      
      <Divider style={styles.divider} />
      
      <Text 
        variant="titleLarge" 
        style={[styles.subtitle, { color: theme.colors.onBackground }]}
      >
        Database Debugging
      </Text>
      
      <Text 
        variant="bodyLarge" 
        style={[styles.description, { color: theme.colors.onBackground }]}
      >
        This section helps debug database connectivity issues by showing details about 
        the database connection and file system status:
      </Text>
      
      <DatabaseDebug />
      
      <Text 
        variant="bodyMedium" 
        style={[styles.footer, { color: theme.colors.onBackground }]}
      >
        This example serves as a reference for how to implement database 
        functionality in your own apps built with this template. Changes 
        made in the Settings screen and above example are persisted in the database.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    marginHorizontal: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  bulletPoints: {
    marginHorizontal: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  footer: {
    marginHorizontal: 16,
    marginTop: 24,
    fontStyle: "italic",
    opacity: 0.8,
  },
});