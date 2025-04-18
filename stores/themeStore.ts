import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";

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
 * Custom storage implementation using React Native's AsyncStorage
 */
const asyncStorageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value;
    } catch (error) {
      console.error("Error loading theme from storage:", error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.error("Error saving theme to storage:", error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error("Error removing theme from storage:", error);
    }
  },
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
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({ themeMode: state.themeMode }),
    },
  ),
);
