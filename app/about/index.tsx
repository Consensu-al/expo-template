import { useColorScheme } from "@/hooks/useColorScheme";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, List, Text, useTheme } from "react-native-paper";

export default function AboutScreen() {
  // Get package.json version using Constants
  const version = Constants.expoConfig?.version || "0.0.0";
  const theme = useTheme();
  const colorScheme = useColorScheme();

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
      <Text style={[styles.title, dynamicStyles.title]}>About This App</Text>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="App Information" titleVariant="titleLarge" />
        <Card.Content>
          <Text variant="bodyMedium">
            This app was created using the Consensual Expo Template, which provides a solid
            foundation for building React Native applications with Expo Router.
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="Technology Stack" titleVariant="titleLarge" />
        <Card.Content>
          <List.Item
            title="Expo & React Native"
            description="Framework for building native apps"
            left={(props) => <List.Icon {...props} icon="react" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="Zustand"
            description="State management"
            left={(props) => <List.Icon {...props} icon="archive" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="Zod"
            description="Data validation"
            left={(props) => (
              <List.Icon {...props} icon="check-circle" color={theme.colors.primary} />
            )}
          />
          <Divider />
          <List.Item
            title="Drizzle & SQLite"
            description="Database management"
            left={(props) => <List.Icon {...props} icon="database" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="React Native Paper"
            description="Material Design components"
            left={(props) => (
              <List.Icon {...props} icon="material-design" color={theme.colors.primary} />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
        <Card.Title title="Version" titleVariant="titleLarge" />
        <Card.Content>
          <Text variant="bodyMedium">{version}</Text>
          <Text
            variant="bodySmall"
            style={[styles.buildInfo, { color: theme.colors.onSurfaceVariant }]}
          >
            Build ID: {Constants.expoConfig?.extra?.buildNumber || "Development"}
          </Text>
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
  buildInfo: {
    marginTop: 4,
    opacity: 0.7,
  },
});
