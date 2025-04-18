import { useThemeStore } from "@/stores/themeStore";
import { useColorScheme as useNativeColorScheme } from "react-native";

/**
 * ColorScheme type used throughout the app
 */
export type ColorScheme = "light" | "dark";

/**
 * Custom hook that provides the active color scheme based on:
 * 1. The user's preference from the theme store
 * 2. The system setting if user preference is set to 'system'
 *
 * @returns The active color scheme ('light' or 'dark')
 */
export function useColorScheme(): ColorScheme {
  // Get the user's theme preference
  const { themeMode } = useThemeStore();

  // Get the system's theme preference (fallback to "light" if undefined)
  const systemTheme = useNativeColorScheme() || "light";

  // If user set to follow system, return system theme
  if (themeMode === "system") {
    return systemTheme === "dark" ? "dark" : "light";
  }

  // Otherwise return user's explicit choice
  return themeMode;
}
