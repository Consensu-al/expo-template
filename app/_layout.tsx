import { useFonts } from "expo-font";
import { Slot, useRouter, usePathname, type Href } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Appbar, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { DATABASE_NAME } from "@/constants/Database";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerItem,
  DrawerTitle,
} from "@/components/ui/Drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoggerProvider } from "@consensu.al/react-native-logger";
import { logger as appLogger } from "@/lib/logger";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Use the colorScheme value which now respects the user preference
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // SQLite database setup
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      (async () => {
        try {
          // Log app startup with additional info about the database state
          appLogger.log("Application started", {
            colorScheme,
            appStartTime: new Date().toISOString(),
            dbMigrationSuccess: success,
            appVersion: "1.0.0",
          });
          
          // Log a few more test entries
          appLogger.warn("Test warning message", { test: true });
          appLogger.error("Test error message", { test: true, sensitive: "SECRET_VALUE" });
        } catch (error) {
          console.error("Failed during app startup:", error);
        } finally {
          // Hide splash screen when ready
          await SplashScreen.hideAsync();
        }
      })();
    }
  }, [loaded, colorScheme, success]);

  if (!loaded) {
    return null;
  }

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const navigateTo = (routeName: Href) => {
    closeDrawer();
    router.push(routeName);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <LoggerProvider initialConfig={{ enabled: true, secureMode: true, console: __DEV__ }}>
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
                      active={pathname === "/"}
                    />
                    <DrawerItem
                      title="About"
                      icon="information"
                      onPress={() => navigateTo("/about")}
                      active={pathname === "/about"}
                    />
                    <DrawerItem
                      title="Settings"
                      icon="cog"
                      onPress={() => navigateTo("/settings")}
                      active={pathname === "/settings"}
                    />
                  </DrawerContent>
                </Drawer>
              </View>
            </PaperProvider>
          </LoggerProvider>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
