import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Appbar.Action icon="home" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Appbar.Action icon="compass" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Appbar.Action icon="account" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
    </Tabs>
  );
}
