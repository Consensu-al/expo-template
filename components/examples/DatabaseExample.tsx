import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useSettingsStore } from "@/stores/settingsStore";
import { useDatabase } from "@/db/provider";
import { eq } from "drizzle-orm";
import { settingsTable } from "@/db/schema";

/**
 * DatabaseExample component
 * 
 * This component demonstrates how to use the database integration in the app.
 * It shows how to:
 * 1. Get data from a database-backed Zustand store
 * 2. Directly interact with the database using drizzle-orm
 * 3. Visualize database operations
 */
export default function DatabaseExample() {
  const theme = useTheme();
  const { db, isDbReady } = useDatabase();
  const { settings, isLoading, error, resetSettings } = useSettingsStore();
  const [dbRecord, setDbRecord] = useState<string | null>(null);
  const [isLoadingRecord, setIsLoadingRecord] = useState(false);

  // Helper function to fetch the raw database record
  const fetchRawRecord = async () => {
    if (!db || !isDbReady) return;
    
    setIsLoadingRecord(true);
    try {
      const record = await db
        .select()
        .from(settingsTable)
        .where(eq(settingsTable.key, "appSettings"))
        .get();
      
      if (record) {
        setDbRecord(JSON.stringify(record, null, 2));
      } else {
        setDbRecord("No settings record found in database");
      }
    } catch (error) {
      console.error("Error fetching raw record:", error);
      setDbRecord(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoadingRecord(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16 }}>Loading settings from database...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: theme.colors.error }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Database Integration Example" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.paragraph}>
            This example demonstrates how the app uses a generic key-value database pattern
            with Drizzle ORM and Zustand to store application settings. No schema changes
            are needed when adding new settings.
          </Text>
          
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Current Settings from Zustand Store
          </Text>
          <View style={styles.codeBlock}>
            <Text 
              variant="bodySmall" 
              style={[styles.code, { color: theme.colors.onSurfaceVariant }]}
            >
              Theme: {settings.appearance.theme}{"\n"}
              Font Size: {settings.appearance.fontSize}{"\n"}
              Notifications: {settings.notifications.enabled ? "Enabled" : "Disabled"}
            </Text>
          </View>
          
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Raw Database Record
          </Text>
          <View style={styles.codeBlock}>
            {isLoadingRecord ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : (
              <Text 
                variant="bodySmall" 
                style={[styles.code, { color: theme.colors.onSurfaceVariant }]}
              >
                {dbRecord || "Click 'Fetch Raw Record' to view the database entry"}
              </Text>
            )}
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" onPress={fetchRawRecord} disabled={!isDbReady || isLoadingRecord}>
            Fetch Raw Record
          </Button>
          <Button mode="outlined" onPress={resetSettings} disabled={!isDbReady || isLoading}>
            Reset Settings
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    minHeight: 100,
  },
  code: {
    fontFamily: "monospace",
  },
});