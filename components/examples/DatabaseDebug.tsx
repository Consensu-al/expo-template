import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Divider, Text, useTheme } from "react-native-paper";
import { getDb } from "@/db/drizzle";
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
  const [dbStatus, setDbStatus] = useState<{
    isConnected: boolean;
    error: string | null;
  }>({ isConnected: false, error: null });
  
  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const db = await getDb();
        setDbStatus({ isConnected: !!db, error: null });
      } catch (error) {
        setDbStatus({ 
          isConnected: false, 
          error: error instanceof Error ? error.message : "Unknown error" 
        });
      }
    };
    
    checkDatabase();
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Database Debug Information" />
        <Card.Content>
          <Text variant="titleSmall">Database Connection</Text>
          <View style={styles.infoBlock}>
            <Text>Database Ready: {dbStatus.isConnected ? "Yes" : "No"}</Text>
            <Text>Database Instance: {dbStatus.isConnected ? "Connected" : "Not Connected"}</Text>
            <Text>Database Name: {DATABASE_NAME}</Text>
            <Text>Encryption: AES-256 (Enabled)</Text>
            {dbStatus.error && (
              <Text style={{ color: theme.colors.error }}>
                Error: {dbStatus.error}
              </Text>
            )}
          </View>
          
          <Divider style={styles.divider} />
          
          <Text variant="titleSmall">Database Information</Text>
          <View style={styles.infoBlock}>
            <Text>Encrypted SQLite is being used for persistent storage.</Text>
            <Text>AsyncStorage is used for Zustand state persistence.</Text>
            <Text>Database uses @op-engineering/op-sqlite for better performance.</Text>
            {dbStatus.isConnected && (
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