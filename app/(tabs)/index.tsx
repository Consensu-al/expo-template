import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

// Import the generated ReadmeContent component if it exists, otherwise use placeholder
let ReadmeContent;
try {
  ReadmeContent = require("@/assets/generated/ReadmeContent").default;
} catch (error) {
  // During development, the component might not exist yet
  // We'll use a placeholder import that will inform developers to run the generate-content script
  const PlaceholderContent = ({ theme }) => (
    <View style={{ padding: 20 }}>
      <View style={{ 
        padding: 16, 
        backgroundColor: theme.colors.errorContainer,
        borderRadius: 8,
      }}>
        <Text style={{ 
          color: theme.colors.onErrorContainer,
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 8,
        }}>
          README content not generated
        </Text>
        <Text style={{ color: theme.colors.onErrorContainer }}>
          The build-time content generation hasn't been run yet.
          Please run:
        </Text>
        <Text style={{ 
          fontFamily: 'monospace',
          backgroundColor: theme.colors.surfaceVariant,
          color: theme.colors.onSurfaceVariant,
          padding: 8,
          marginVertical: 8,
          borderRadius: 4,
        }}>
          bun run generate-content
        </Text>
        <Text style={{ color: theme.colors.onErrorContainer }}>
          This will transform the README.md into a React Native component.
        </Text>
      </View>
    </View>
  );
  ReadmeContent = PlaceholderContent;
}

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <ReadmeContent theme={theme} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
});
