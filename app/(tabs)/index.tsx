import { useColorScheme } from "@/hooks/useColorScheme";
import { logger } from "@/lib/logger";
import { createId } from "@paralleldrive/cuid2";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const [refreshKey, setRefreshKey] = useState(0);
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
    content: {
      color: theme.colors.onBackground,
    },
    card: {
      backgroundColor: theme.colors.surface,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.title]}>Example Content</Text>
      <Text style={[styles.content, dynamicStyles.content]}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  content: {
    fontSize: 16,
    fontWeight: "normal",
    margin: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    borderRadius: 28,
  },
});
