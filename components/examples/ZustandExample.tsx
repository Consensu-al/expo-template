import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Button, Card, Text, useTheme, Divider } from "react-native-paper";
import { useSettingsStore } from "@/stores/settingsStore";
import { useThemeStore } from "@/stores/themeStore";

/**
 * ZustandExample component
 * 
 * This component demonstrates how to use Zustand stores for state management.
 * It shows:
 * 1. Multiple Zustand stores (settings and theme)
 * 2. Reading state from stores
 * 3. Updating store values
 * 4. Persistence with AsyncStorage
 */
export default function ZustandExample() {
  const theme = useTheme();
  const { settings, isLoading, error, updateSettings, resetSettings } = useSettingsStore();
  const { themeMode, setThemeMode } = useThemeStore();
  const [rawSettings, setRawSettings] = useState<string | null>(null);
  
  // Show the raw settings JSON
  const showRawSettings = () => {
    setRawSettings(JSON.stringify(settings, null, 2));
  };
  
  // Toggle notifications setting
  const toggleNotifications = () => {
    updateSettings("notifications", {
      enabled: !settings.notifications.enabled,
    });
  };
  
  // Cycle through theme modes
  const cycleTheme = () => {
    const modes = ["light", "dark", "system"] as const;
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };
  
  // Change font size setting
  const cycleFontSize = () => {
    const sizes = ["small", "normal", "large", "extra-large"] as const;
    const currentIndex = sizes.indexOf(settings.appearance.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    updateSettings("appearance", {
      fontSize: sizes[nextIndex],
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16 }}>Loading settings...</Text>
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
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Zustand State Management" subtitle="Persisted with AsyncStorage" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.paragraph}>
            This example demonstrates how the app uses Zustand for state management
            with AsyncStorage persistence. Settings and theme preferences are automatically
            saved and restored between app launches.
          </Text>
          
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Current Settings
          </Text>
          <View style={styles.settingsRow}>
            <Text>Theme Mode:</Text>
            <Text style={styles.settingValue}>{themeMode}</Text>
          </View>
          <View style={styles.settingsRow}>
            <Text>Font Size:</Text>
            <Text style={styles.settingValue}>{settings.appearance.fontSize}</Text>
          </View>
          <View style={styles.settingsRow}>
            <Text>Notifications:</Text>
            <Text style={styles.settingValue}>
              {settings.notifications.enabled ? "Enabled" : "Disabled"}
            </Text>
          </View>
          <View style={styles.settingsRow}>
            <Text>Reduced Motion:</Text>
            <Text style={styles.settingValue}>
              {settings.appearance.reducedMotion ? "Enabled" : "Disabled"}
            </Text>
          </View>
          
          <Divider style={styles.divider} />
          
          {rawSettings && (
            <>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Raw Settings Data
              </Text>
              <ScrollView 
                style={styles.rawDataContainer} 
                showsVerticalScrollIndicator={true}
              >
                <Text style={styles.codeText}>
                  {rawSettings}
                </Text>
              </ScrollView>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="outlined" 
            onPress={toggleNotifications}
          >
            Toggle Notifications
          </Button>
          <Button 
            mode="outlined" 
            onPress={cycleTheme}
          >
            Cycle Theme
          </Button>
          <Button 
            mode="outlined" 
            onPress={cycleFontSize}
          >
            Change Font Size
          </Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Advanced Options" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.paragraph}>
            These actions demonstrate working with the entire store state and persistence.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="outlined" 
            onPress={showRawSettings} 
            icon="code-json"
          >
            Show Raw Data
          </Button>
          <Button 
            mode="outlined" 
            onPress={resetSettings} 
            icon="restart"
          >
            Reset All Settings
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 12,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingValue: {
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 16,
  },
  rawDataContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 4,
    maxHeight: 200,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 12,
  },
});