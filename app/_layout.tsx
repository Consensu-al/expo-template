import { useFonts } from 'expo-font';
import { type Href, Slot, usePathname, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import {
  Appbar,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerItem,
  DrawerTitle,
} from '@/components/ui/Drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/contexts/ThemeProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return <RootLayoutContent />;
}

function RootLayoutContent() {
  // === HOOKS SECTION - ALL HOOKS MUST BE CALLED UNCONDITIONALLY ===
  // (1) React Router hooks
  const router = useRouter();
  const pathname = usePathname();

  // (2) Context hooks
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // (3) State hooks
  const [drawerOpen, setDrawerOpen] = useState(false);

  // (4) Font hooks
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // (5) Derived state
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  // (6) Effect hooks
  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      (async () => {
        try {
          // Log app startup
          const appVersion = Constants.expoConfig?.version || '1.0.0';
          console.log('Application started', {
            colorScheme,
            appStartTime: new Date().toISOString(),
            appVersion,
          });
        } catch (error) {
          console.error('Failed during app startup:', error);
        } finally {
          // Hide splash screen when ready
          await SplashScreen.hideAsync();
        }
      })();
    }
  }, [loaded, colorScheme]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 20 }}>Loading fonts...</Text>
      </View>
    );
  }

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const navigateTo = (routeName: Href) => {
    closeDrawer();
    router.navigate(routeName);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <ThemeProvider>
            <View style={{ flex: 1 }}>
              <StatusBar style="auto" />

            {/* Main App View with Custom Header */}
            <Appbar.Header
              elevated
              style={{ paddingTop: insets.top, height: 56 + insets.top }}>
              <Appbar.Content title="Consensual App" />
              <Appbar.Action icon="menu" onPress={openDrawer} />
            </Appbar.Header>

            {/* Main Content */}
            <View style={{ flex: 1 }}>
              <Slot />
            </View>

            {/* Custom Drawer */}
            <Drawer open={drawerOpen} onClose={closeDrawer} side="right">
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <DrawerContent>
                <DrawerItem
                  title="Home"
                  icon="home"
                  onPress={() => navigateTo('/')}
                  active={pathname === '/'}
                />
                <DrawerItem
                  title="Examples"
                  icon="book-open-variant"
                  onPress={() => navigateTo('/examples/' as Href)}
                  active={pathname.startsWith('/examples')}
                />
                <DrawerItem
                  title="About"
                  icon="information"
                  onPress={() => navigateTo('/about')}
                  active={pathname === '/about'}
                />
                <DrawerItem
                  title="Settings"
                  icon="cog"
                  onPress={() => navigateTo('/settings')}
                  active={pathname === '/settings'}
                />
              </DrawerContent>
            </Drawer>
            </View>
          </ThemeProvider>
        </Suspense>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
