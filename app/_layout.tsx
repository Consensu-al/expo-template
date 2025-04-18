import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { runMigrations } from '../db';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Initialize database when app starts
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      runMigrations();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <Drawer
        screenOptions={{
          headerShown: true,
          header: (props) => {
            const openDrawer = () => {
              props.navigation.openDrawer();
            };
            
            return (
              <Appbar.Header elevated style={{ paddingTop: insets.top, height: 56 + insets.top }}>
                <Appbar.Content title={props.route.name} />
                <Appbar.Action icon="menu" onPress={openDrawer} />
              </Appbar.Header>
            );
          }
        }}
        drawerContent={(props) => {
          return (
            <Drawer.DrawerContentScrollView {...props}>
              <Drawer.DrawerItemList {...props} />
            </Drawer.DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => <Appbar.Action icon="home" color={color} />
          }}
        />
        <Drawer.Screen
          name="about/index"
          options={{
            title: 'About',
            drawerIcon: ({ color }) => <Appbar.Action icon="information" color={color} />
          }}
        />
        <Drawer.Screen
          name="settings/index"
          options={{
            title: 'Settings',
            drawerIcon: ({ color }) => <Appbar.Action icon="cog" color={color} />
          }}
        />
      </Drawer>
    </PaperProvider>
  );
}
