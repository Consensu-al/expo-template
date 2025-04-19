import { db } from "@/db";
import { appLogsTable } from "@/db/logging-schema";
import { logger } from "@/lib/logger";
import { useLoggerSettings } from "@consensu.al/react-native-logger";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Divider,
  List,
  Snackbar,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { eq } from "drizzle-orm";

interface LogItem {
  id: string;
  timestamp: string | Date;
  level: string;
  message: string;
  metadata?: string | null;
}

export default function LogsScreen() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const flatListRef = useRef<FlatList<LogItem>>(null);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { enabled, secureMode, setEnabled, setSecureMode } = useLoggerSettings();

  // Load logs when the screen opens
  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    // Scroll to bottom when logs are loaded
    if (flatListRef.current && logs.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [logs]);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      // Using proper drizzle query builder with try/catch to handle possible errors
      try {
        // Query logs from the database using drizzle
        const logData = await db.select().from(appLogsTable).orderBy(appLogsTable.timestamp);
        setLogs(logData as LogItem[]);
      } catch (queryError) {
        // Specific handling for missing table error
        console.error("Error querying logs table:", queryError);
        
        if (queryError.message && queryError.message.includes("no such table")) {
          showSnackbar("Logs table not found. Please restart the app to create it.");
        } else {
          showSnackbar("Error loading logs");
        }
        
        // Always set empty logs on error
        setLogs([]);
      }
    } catch (err) {
      console.error("Unexpected error loading logs:", err);
      showSnackbar("Unexpected error loading logs");
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleClearLogs = async () => {
    setIsClearing(true);
    try {
      // Delete all logs from the database
      await db.delete(appLogsTable);
      setLogs([]);
      showSnackbar("Logs cleared successfully");
    } catch (err) {
      console.error("Error clearing logs:", err);
      showSnackbar("Failed to clear logs");
    } finally {
      setIsClearing(false);
    }
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleRefreshLogs = () => {
    loadLogs();
  };

  const formatTimestamp = (timestamp: string | Date) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
      return String(timestamp);
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'log':
        return theme.colors.primary;
      case 'warn':
        return theme.colors.warning || theme.colors.orange || '#FFA500';
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.onSurface;
    }
  };

  // Parse metadata if it exists and is a string
  const parseMetadata = (metadata: string | null | undefined) => {
    if (!metadata) return null;
    try {
      return JSON.parse(metadata);
    } catch (e) {
      return metadata;
    }
  };

  const renderLogItem = ({ item }: { item: LogItem }) => {
    const logLevelColor = getLogLevelColor(item.level);
    const metadata = parseMetadata(item.metadata);
    
    let displayMessage = item.message;
    
    // Check if message contains any redacted content (marked with ***)
    const containsRedactedContent = typeof displayMessage === 'string' && displayMessage.includes("***");

    return (
      <Card style={styles.logCard} mode="outlined">
        <Card.Content>
          <View style={styles.logHeader}>
            <Text variant="labelSmall" style={styles.timestamp}>
              {formatTimestamp(item.timestamp)}
            </Text>
            <View style={[styles.levelBadge, { backgroundColor: logLevelColor }]}>
              <Text variant="labelSmall" style={styles.levelText}>
                {item.level.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={styles.message}>{displayMessage}</Text>
          
          {metadata && (
            <View style={styles.metadataContainer}>
              <Divider style={styles.divider} />
              <Text variant="labelSmall" style={styles.metadataLabel}>Metadata:</Text>
              <ScrollView horizontal style={styles.metadataScroll}>
                <Text variant="bodySmall" style={styles.metadata}>
                  {typeof metadata === 'object' 
                    ? JSON.stringify(metadata, null, 2) 
                    : String(metadata)}
                </Text>
              </ScrollView>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleGoBack} />
        <Appbar.Content title="Application Logs" />
        <Appbar.Action icon="refresh" onPress={handleRefreshLogs} disabled={isLoading} />
      </Appbar.Header>

      <View style={styles.settingsSection}>
        <List.Item
          title="Log Capture"
          description={enabled ? "Capturing logs is enabled" : "Capturing logs is disabled"}
          left={props => <List.Icon {...props} icon="text-box-outline" />}
          right={() => (
            <Switch value={enabled} onValueChange={(value) => {
              setEnabled(value);
              // Force refresh to update log list
              loadLogs();
            }} />
          )}
        />
        <Divider />
        <List.Item
          title="Secure Mode"
          description={secureMode ? "Sensitive data is redacted" : "All data is visible in logs"}
          left={props => <List.Icon {...props} icon="shield-outline" />}
          right={() => (
            <Switch 
              value={secureMode} 
              onValueChange={setSecureMode} 
              disabled={!enabled} 
            />
          )}
        />
      </View>

      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading logs...</Text>
        </View>
      ) : logs.length === 0 ? (
        <View style={styles.centerContent}>
          <Text>No logs to display</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.logList}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleClearLogs}
          disabled={isClearing || logs.length === 0}
          style={styles.clearButton}
          contentStyle={styles.buttonContent}
          loading={isClearing}
        >
          {isClearing ? "Clearing Logs..." : "Clear Logs"}
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsSection: {
    marginBottom: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
  },
  logList: {
    padding: 16,
  },
  logCard: {
    marginBottom: 8,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timestamp: {
    opacity: 0.7,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 4,
  },
  metadataContainer: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 4,
  },
  metadataLabel: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metadataScroll: {
    maxHeight: 100,
  },
  metadata: {
    fontFamily: 'monospace',
  },
  buttonContainer: {
    padding: 16,
  },
  clearButton: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});