import { useColorScheme } from "@/hooks/useColorScheme";
import { type ThemeMode, useThemeStore } from "@/stores/themeStore";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Card,
  Divider,
  List,
  RadioButton,
  Switch,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { themeMode, setThemeMode } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataBackupEnabled, setDataBackupEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  // Get version from constants
  const version = Constants.expoConfig?.version || "0.0.0";

  // Handle theme mode change
  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
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

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.title]}>Settings</Text>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="App Preferences" titleVariant="titleLarge" />
        <Card.Content>
          <List.Section>
            <List.Subheader>Theme</List.Subheader>
            <RadioButton.Group
              onValueChange={(newValue) => handleThemeModeChange(newValue as ThemeMode)}
              value={themeMode}
            >
              <TouchableRipple onPress={() => handleThemeModeChange("light")}>
                <View style={styles.radioButtonRow}>
                  <View style={styles.radioButtonItem}>
                    <List.Icon icon="white-balance-sunny" color={theme.colors.primary} />
                    <Text style={{ color: theme.colors.onSurface }}>Light</Text>
                  </View>
                  <RadioButton value="light" />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => handleThemeModeChange("dark")}>
                <View style={styles.radioButtonRow}>
                  <View style={styles.radioButtonItem}>
                    <List.Icon icon="moon-waning-crescent" color={theme.colors.primary} />
                    <Text style={{ color: theme.colors.onSurface }}>Dark</Text>
                  </View>
                  <RadioButton value="dark" />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => handleThemeModeChange("system")}>
                <View style={styles.radioButtonRow}>
                  <View style={styles.radioButtonItem}>
                    <List.Icon icon="theme-light-dark" color={theme.colors.primary} />
                    <Text style={{ color: theme.colors.onSurface }}>System</Text>
                  </View>
                  <RadioButton value="system" />
                </View>
              </TouchableRipple>
            </RadioButton.Group>
          </List.Section>
          <Divider />
          <List.Item
            title="Notifications"
            description="Enable push notifications"
            left={(props) => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
            right={() => (
              <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
            )}
          />
          <Divider />
          <List.Item
            title="Data Backup"
            description="Backup app data to cloud"
            left={(props) => (
              <List.Icon {...props} icon="cloud-upload" color={theme.colors.primary} />
            )}
            right={() => <Switch value={dataBackupEnabled} onValueChange={setDataBackupEnabled} />}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="Security" titleVariant="titleLarge" />
        <Card.Content>
          <List.Item
            title="Biometric Authentication"
            description="Use fingerprint or face ID"
            left={(props) => (
              <List.Icon {...props} icon="fingerprint" color={theme.colors.primary} />
            )}
            right={() => <Switch value={biometricsEnabled} onValueChange={setBiometricsEnabled} />}
          />
          <Divider />
          <List.Item
            title="Change Password"
            description="Update your account password"
            left={(props) => <List.Icon {...props} icon="lock" color={theme.colors.primary} />}
            right={(props) => (
              <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="Developer" titleVariant="titleLarge" />
        <Card.Content>
          <List.Item
            title="Application Logs"
            description="View and manage application logs"
            left={(props) => (
              <List.Icon {...props} icon="text-box-outline" color={theme.colors.primary} />
            )}
            right={(props) => (
              <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />
            )}
            onPress={() => router.push('/settings/logs' as const)}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="About" titleVariant="titleLarge" />
        <Card.Content>
          <List.Item
            title="App Version"
            description={version}
            left={(props) => (
              <List.Icon {...props} icon="information" color={theme.colors.primary} />
            )}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={(props) => (
              <List.Icon {...props} icon="file-document" color={theme.colors.primary} />
            )}
            right={(props) => (
              <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />
            )}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield" color={theme.colors.primary} />}
            right={(props) => (
              <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />
            )}
          />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  radioButtonItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
