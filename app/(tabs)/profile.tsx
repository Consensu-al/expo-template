import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, List, Text, useTheme } from "react-native-paper";

export default function ProfileScreen() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  // Create dynamic styles based on theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    name: {
      color: theme.colors.onBackground,
    },
    email: {
      color: theme.colors.onSurfaceVariant,
    },
    divider: {
      backgroundColor: theme.colors.outlineVariant,
    },
    card: {
      backgroundColor: theme.colors.surface,
    },
  };
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.profileHeader}>
        <Avatar.Icon
          size={80}
          icon="account"
          color={theme.colors.onPrimary}
          backgroundColor={theme.colors.primary}
        />
        <Text style={[styles.name, dynamicStyles.name]}>Example User</Text>
        <Text style={[styles.email, dynamicStyles.email]}>user@example.com</Text>
      </View>

      <Divider style={[styles.divider, dynamicStyles.divider]} />

      <Card style={[styles.card, dynamicStyles.card]}>
        <Card.Title title="Profile Information" />
        <Card.Content>
          <List.Item
            title="Username"
            description="exampleuser"
            left={(props) => <List.Icon {...props} icon="account" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="Email"
            description="user@example.com"
            left={(props) => <List.Icon {...props} icon="email" color={theme.colors.primary} />}
          />
          <Divider />
          <List.Item
            title="Member Since"
            description="April 17, 2025"
            left={(props) => <List.Icon {...props} icon="calendar" color={theme.colors.primary} />}
          />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={() => {}} style={styles.button} icon="account-edit">
        Edit Profile
      </Button>

      <Button mode="outlined" onPress={() => {}} style={styles.button} icon="logout">
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  divider: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
});
