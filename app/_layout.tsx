import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { runMigrations } from '../db';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerItem } from '@/components/ui/Drawer';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  
  // Use the colorScheme value which now respects the user preference
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const [drawerOpen, setDrawerOpen] = useState(false);
  
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

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const navigateTo = (routeName: string) => {
    closeDrawer();
    router.push(routeName);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          
          {/* Main App View with Custom Header */}
          <Appbar.Header elevated style={{ paddingTop: insets.top, height: 56 + insets.top }}>
            <Appbar.Content title="Consensual App" />
            <Appbar.Action icon="menu" onPress={openDrawer} />
          </Appbar.Header>
          
          {/* Main Content */}
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
          
          {/* Custom Drawer */}
          <Drawer 
            open={drawerOpen} 
            onClose={closeDrawer}
            side="right"
          >
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <DrawerItem
              title="Home"
              icon="home"
              onPress={() => navigateTo('/')} 
              active={router.pathname === '/'}
            />
            <DrawerItem
              title="About" 
              icon="information"
              onPress={() => navigateTo('/about')} 
              active={router.pathname === '/about'}
            />
            <DrawerItem
              title="Settings"
              icon="cog"
              onPress={() => navigateTo('/settings')} 
              active={router.pathname === '/settings'}
            />
          </DrawerContent>
        </Drawer>
        </View>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}