import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useRouter } from "expo-router";
import { Appbar, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerItem,
  DrawerTitle,
} from "@/components/ui/Drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoggerProvider } from "@consensu.al/react-native-logger";
import { DatabaseProvider } from "../db/provider";
import { logger as appLogger } from "@/lib/logger";
import { MigrationHandler } from "./MigrationHandler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Use the colorScheme value which now respects the user preference
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Track migration status separately
  const [migrationsComplete, setMigrationsComplete] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  
  // Hide the splash screen once fonts are loaded and migrations complete
  useEffect(() => {
    if (loaded && migrationsComplete) {
      (async () => {
        try {
          // Log app startup after migrations are complete
          appLogger.log("Application started", {
            colorScheme,
            appStartTime: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Failed during app startup:", error);
        } finally {
          // Hide splash screen when ready
          await SplashScreen.hideAsync();
        }
      })();
    }
  }, [loaded, migrationsComplete, colorScheme]);

  if (!loaded) {
    return null;
  }

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const navigateTo = (routeName: string) => {
    closeDrawer();
    router.push(routeName);
  };

  // If font loaded but migrations not complete, show migration handler
  if (!migrationsComplete) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MigrationHandler onComplete={() => setMigrationsComplete(true)} />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DatabaseProvider>
        <LoggerProvider logger={appLogger} initialConfig={{ enabled: true, secureMode: true, console: __DEV__ }}>
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
              <Drawer open={drawerOpen} onClose={closeDrawer} side="right">
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <DrawerContent>
                  <DrawerItem
                    title="Home"
                    icon="home"
                    onPress={() => navigateTo("/")}
                    active={router.pathname === "/"}
                  />
                  <DrawerItem
                    title="About"
                    icon="information"
                    onPress={() => navigateTo("/about")}
                    active={router.pathname === "/about"}
                  />
                  <DrawerItem
                    title="Settings"
                    icon="cog"
                    onPress={() => navigateTo("/settings")}
                    active={router.pathname === "/settings"}
                  />
                </DrawerContent>
              </Drawer>
            </View>
          </PaperProvider>
        </LoggerProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
