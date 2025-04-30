import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import ZustandExample from "@/components/examples/ZustandExample";

export default function ZustandScreen() {
  const theme = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={styles.contentContainer}
    >
      <ZustandExample />
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