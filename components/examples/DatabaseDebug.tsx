import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Divider, Text, useTheme } from "react-native-paper";
import { useDatabase } from "@/db/provider";
import { DATABASE_NAME } from "@/constants/Database";

/**
 * DatabaseDebug component
 * 
 * This component helps debug database issues by showing:
 * 1. The current state of the database connection
 * 2. Basic database configuration information
 */
export default function DatabaseDebug() {
  const theme = useTheme();
  const { db, isDbReady, error } = useDatabase();
  
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Database Debug Information" />
        <Card.Content>
          <Text variant="titleSmall">Database Connection</Text>
          <View style={styles.infoBlock}>
            <Text>Database Ready: {isDbReady ? "Yes" : "No"}</Text>
            <Text>Database Instance: {db ? "Connected" : "Not Connected"}</Text>
            <Text>Database Name: {DATABASE_NAME}</Text>
            {error && (
              <Text style={{ color: theme.colors.error }}>
                Error: {error.message}
              </Text>
            )}
          </View>
          
          <Divider style={styles.divider} />
          
          <Text variant="titleSmall">Database Information</Text>
          <View style={styles.infoBlock}>
            <Text>SQLite is being used for persistent storage.</Text>
            <Text>AsyncStorage is used for Zustand state persistence.</Text>
            {db && (
              <Text style={{ fontStyle: 'italic', marginTop: 8 }}>
                Database is currently initialized and operational.
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  infoBlock: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
});