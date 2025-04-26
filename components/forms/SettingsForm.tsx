import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, List, Switch, Text, useTheme } from 'react-native-paper';
import { z } from 'zod';
import { settingsSchema, defaultSettings, type Settings } from '@/schemas/settings';

interface SettingsFormProps {
  initialSettings?: Partial<Settings>;
  onSave: (settings: Settings) => void;
  isLoading?: boolean;
}

export default function SettingsForm({
  initialSettings,
  onSave,
  isLoading = false,
}: SettingsFormProps) {
  const theme = useTheme();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize with provided settings or defaults
  useEffect(() => {
    if (initialSettings) {
      try {
        // Merge initial settings with defaults using Zod's parsing
        const mergedSettings = settingsSchema.parse({
          ...defaultSettings,
          ...initialSettings,
        });
        setSettings(mergedSettings);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Invalid settings format:', error.errors);
        }
        // Fall back to defaults on error
        setSettings(defaultSettings);
      }
    }
  }, [initialSettings]);

  const updateSetting = <T extends keyof Settings>(
    category: T,
    field: keyof Settings[T],
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value,
      },
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    try {
      // Validate settings before saving
      const validatedSettings = settingsSchema.parse({
        ...settings,
        lastUpdated: new Date(),
      });
      
      onSave(validatedSettings);
      setIsDirty(false);
    } catch (error) {
      console.error('Invalid settings:', error);
      // Here you could show an error message to the user
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setIsDirty(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Appearance Settings */}
      <Card style={styles.card}>
        <Card.Title title="Appearance" />
        <Card.Content>
          <List.Item
            title="Theme"
            description={`${settings.appearance.theme.charAt(0).toUpperCase()}${settings.appearance.theme.slice(1)}`}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <View style={styles.themeSelector}>
                <Button
                  mode={settings.appearance.theme === 'light' ? 'contained' : 'outlined'}
                  onPress={() => updateSetting('appearance', 'theme', 'light')}
                  icon="white-balance-sunny"
                  compact
                  disabled={isLoading}
                >
                  Light
                </Button>
                <Button
                  mode={settings.appearance.theme === 'dark' ? 'contained' : 'outlined'}
                  onPress={() => updateSetting('appearance', 'theme', 'dark')}
                  icon="moon-waning-crescent"
                  compact
                  style={{ marginHorizontal: 8 }}
                  disabled={isLoading}
                >
                  Dark
                </Button>
                <Button
                  mode={settings.appearance.theme === 'system' ? 'contained' : 'outlined'}
                  onPress={() => updateSetting('appearance', 'theme', 'system')}
                  icon="palette-swatch"
                  compact
                  disabled={isLoading}
                >
                  System
                </Button>
              </View>
            )}
          />
          <Divider />
          <List.Item
            title="Reduced Motion"
            description="Minimize animations"
            left={props => <List.Icon {...props} icon="motion" />}
            right={() => (
              <Switch
                value={settings.appearance.reducedMotion}
                onValueChange={value => updateSetting('appearance', 'reducedMotion', value)}
                disabled={isLoading}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Notifications Settings */}
      <Card style={styles.card}>
        <Card.Title title="Notifications" />
        <Card.Content>
          <List.Item
            title="Enable Notifications"
            description="Master toggle for all notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={settings.notifications.enabled}
                onValueChange={value => updateSetting('notifications', 'enabled', value)}
                disabled={isLoading}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Push Notifications"
            description="Receive push notifications"
            left={props => <List.Icon {...props} icon="bell-ring" />}
            right={() => (
              <Switch
                value={settings.notifications.pushNotifications}
                onValueChange={value => updateSetting('notifications', 'pushNotifications', value)}
                disabled={isLoading || !settings.notifications.enabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Sounds"
            description="Play sounds for notifications"
            left={props => <List.Icon {...props} icon="volume-high" />}
            right={() => (
              <Switch
                value={settings.notifications.sounds}
                onValueChange={value => updateSetting('notifications', 'sounds', value)}
                disabled={isLoading || !settings.notifications.enabled}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Privacy Settings */}
      <Card style={styles.card}>
        <Card.Title title="Privacy" />
        <Card.Content>
          <List.Item
            title="Analytics"
            description="Collect anonymous usage data"
            left={props => <List.Icon {...props} icon="chart-bar" />}
            right={() => (
              <Switch
                value={settings.privacy.analytics}
                onValueChange={value => updateSetting('privacy', 'analytics', value)}
                disabled={isLoading}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Crash Reporting"
            description="Send anonymous crash reports"
            left={props => <List.Icon {...props} icon="bug" />}
            right={() => (
              <Switch
                value={settings.privacy.crashReporting}
                onValueChange={value => updateSetting('privacy', 'crashReporting', value)}
                disabled={isLoading}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Save and Reset Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={isLoading || !isDirty}
          loading={isLoading}
        >
          Save Settings
        </Button>
        <Button
          mode="outlined"
          onPress={handleReset}
          style={styles.resetButton}
          disabled={isLoading}
        >
          Reset to Default
        </Button>
      </View>
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
  themeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  saveButton: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  resetButton: {
    paddingVertical: 8,
  },
});