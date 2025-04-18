import { useThemeStore } from "@/stores/themeStore";
import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import type { ColorScheme } from "./useColorScheme";

/**
 * Web-specific implementation of useColorScheme
 * Handles hydration for Next.js/SSR support
 *
 * @returns The active color scheme ('light' or 'dark')
 */
export function useColorScheme(): ColorScheme {
  // State to track if component has hydrated (client-side rendering has begun)
  const [hasHydrated, setHasHydrated] = useState(false);

  // Get the user's theme preference
  const { themeMode } = useThemeStore();

  // Mark component as hydrated after initial render
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Get the system's theme preference (fallback to "light" if undefined)
  const systemTheme = useRNColorScheme() || "light";

  // If not yet hydrated, default to light to avoid hydration mismatch
  if (!hasHydrated) {
    return "light";
  }

  // If user set to follow system, return system theme
  if (themeMode === "system") {
    return systemTheme === "dark" ? "dark" : "light";
  }

  // Otherwise return user's explicit choice
  return themeMode;
}
