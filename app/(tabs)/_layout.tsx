import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          elevation: 4,
          shadowColor: theme.colors.shadow,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "SpaceMono",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Appbar.Action
              icon="home"
              color={color}
              size={22}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Appbar.Action
              icon="compass"
              color={color}
              size={22}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Appbar.Action
              icon="account"
              color={color}
              size={22}
              style={focused ? styles.activeIcon : styles.icon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: -2,
    marginBottom: 0,
  },
  activeIcon: {
    marginTop: -2,
    marginBottom: 0,
    transform: [{ scale: 1.1 }],
  },
});
