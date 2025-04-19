import { useColorScheme } from "@/hooks/useColorScheme";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Divider, List, Text, useTheme } from "react-native-paper";

export default function ExploreScreen() {
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
    description: {
      color: theme.colors.onSurfaceVariant,
    },
    card: {
      backgroundColor: theme.colors.surface,
    },
    paragraph: {
      color: theme.colors.onSurface,
    },
  };
  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.title]}>Explore Screen</Text>
      <Text style={[styles.description, dynamicStyles.description]}>
        This is an example Explore screen. You can customize it to display whatever content you
        need.
      </Text>

      <Card style={[styles.card, dynamicStyles.card]}>
        <Card.Title title="Template Features" />
        <Card.Content>
          <List.Item
            title="Zustand"
            description="Simple, fast state management"
            left={(props) => <List.Icon {...props} icon="archive" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="Zod"
            description="TypeScript-first schema validation"
            left={(props) => (
              <List.Icon {...props} icon="check-circle" color={theme.colors.primary} />
            )}
          />
          <Divider />
          <List.Item
            title="Drizzle + SQLite"
            description="Type-safe SQL toolkit and database"
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
          <Divider />
          <List.Item
            title="FlashList"
            description="High-performance lists"
            left={(props) => <List.Icon {...props} icon="view-list" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="Biome"
            description="Fast linting and formatting"
            left={(props) => <List.Icon {...props} icon="code-tags" color={theme.colors.primary} />}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, dynamicStyles.card]}>
        <Card.Title title="Getting Started" />
        <Card.Content>
          <Text variant="bodyMedium" style={[styles.paragraph, dynamicStyles.paragraph]}>
            This template provides all the tools you need to build modern React Native apps with
            Expo.
          </Text>
          <Text variant="bodyMedium" style={[styles.paragraph, dynamicStyles.paragraph]}>
            You can use the drawer menu to navigate between screens, and the bottom tabs for main
            app sections.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" icon="github">
            View Repository
          </Button>
        </Card.Actions>
      </Card>

      <Card style={[styles.card, dynamicStyles.card]}>
        <Card.Title title="Documentation" />
        <Card.Content>
          <Button mode="text" icon="book-open-variant" style={styles.docButton}>
            Expo Docs
          </Button>
          <Button mode="text" icon="book-open-variant" style={styles.docButton}>
            React Native Paper
          </Button>
          <Button mode="text" icon="book-open-variant" style={styles.docButton}>
            Zustand
          </Button>
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
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
  },
  paragraph: {
    marginBottom: 12,
  },
  docButton: {
    paddingVertical: 4,
    alignItems: "flex-start",
    width: "100%",
  },
});
