import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAsyncStorage } from "@/lib/asyncStorageAdapter";

/**
 * Possible theme modes for the application
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Theme state interface
 */
type ThemeState = {
  /** Current theme mode preference */
  themeMode: ThemeMode;
  /** Set the theme mode */
  setThemeMode: (mode: ThemeMode) => void;
};

/**
 * Theme store hook with persisted state
 * Manages the application's theme mode preference
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Default to system theme
      themeMode: "system" as ThemeMode,

      // Update theme mode
      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
    }),
    {
      name: "theme-storage", // Storage key
      storage: createJSONStorage(() => createAsyncStorage("theme")),
      partialize: (state) => ({ themeMode: state.themeMode }),
    },
  ),
);
