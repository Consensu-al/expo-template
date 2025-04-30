import { useColorScheme } from "@/hooks/useColorScheme";
import { type ThemeMode, useThemeStore } from "@/stores/themeStore";
import { useSettingsStore } from "@/stores/settingsStore";
import SettingsForm from "@/components/forms/SettingsForm";
import type { Settings } from "@/schemas/settings";
import Constants from "expo-constants";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { themeMode, setThemeMode } = useThemeStore();

  // Use the database-backed settings store with persist middleware
  const { settings, isLoading, error, updateSettings, resetSettings } = useSettingsStore();

  // Get version from constants
  const version = Constants.expoConfig?.version || "0.0.0";

  // Handle theme mode change (syncing Zustand theme store with settings store)
  useEffect(() => {
    if (!isLoading && settings.appearance.theme !== themeMode) {
      setThemeMode(settings.appearance.theme as ThemeMode);
    }
  }, [settings.appearance.theme, isLoading, themeMode, setThemeMode]);

  // Handle settings save
  const handleSaveSettings = (updatedSettings: Settings) => {
    // Update each section that changed
    for (const section of Object.keys(updatedSettings)) {
      const sectionKey = section as keyof Settings;
      updateSettings(sectionKey, updatedSettings[sectionKey]);
    }

    // Sync theme with theme store
    setThemeMode(updatedSettings.appearance.theme as ThemeMode);
  };

  // Create dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.onBackground,
    },
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 20 }}>Loading settings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={{ color: theme.colors.error }}>Error loading settings</Text>
        <Text style={{ marginTop: 10 }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.title]}>Settings</Text>
      <Text style={styles.description}>Changes are saved automatically</Text>

      <SettingsForm initialSettings={settings} onSave={handleSaveSettings} isLoading={isLoading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.8,
  },
  card: {
    marginBottom: 16,
  },
  aboutText: {
    marginTop: 12,
    lineHeight: 22,
  },
});
