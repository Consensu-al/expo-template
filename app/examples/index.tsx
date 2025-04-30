import { type Href, Link, router } from "expo-router";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Card, Text, useTheme, List, Divider } from "react-native-paper";
import { useState } from "react";

export default function ExamplesIndex() {
  const theme = useTheme();
  // No file system info in this version

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>Example Screens</Text>

      <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
        This template includes examples to help you get started with key functionality.
      </Text>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="Available Examples" />
        <Card.Content>
          <List.Item
            title="Zod Validation"
            description="Form validation using Zod schema"
            left={(props) => (
              <List.Icon {...props} icon="check-circle" color={theme.colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push("/examples/validation")}
          />
          <Divider />
          <List.Item
            title="Database Integration"
            description="CRUD operations with Drizzle ORM and SQLite"
            left={(props) => <List.Icon {...props} icon="database" color={theme.colors.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push("/examples/database" as Href)}
          />
          <Divider />
          <List.Item
            title="Zustand State Management"
            description="Global state with persistence using Zustand"
            left={(props) => <List.Icon {...props} icon="state-machine" color={theme.colors.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push("/examples/zustand" as Href)}
          />
          <Divider />
          <List.Item
            title="Markdown Rendering"
            description="Build-time markdown to component conversion"
            left={(props) => <List.Icon {...props} icon="markdown" color={theme.colors.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push("/examples/markdown" as Href)}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Text style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          These examples show recommended patterns for this template. Feel free to use them as
          reference for your own implementation.
        </Text>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
    fontSize: 16,
  },
  card: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  hint: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 16,
    opacity: 0.8,
  },
});
