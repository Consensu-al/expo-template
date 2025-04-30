import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import type React from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useThemeStore } from "@/stores/themeStore";

// Define our custom colors
const primaryBlue: string = "#083EF7";
const primaryOrange: string = "#F7C108";

// Create lighter and darker variants
const primaryBlueLight: string = "#3965F9";
const primaryBlueDark: string = "#0632C5";
const primaryOrangeLight: string = "#F9CE39";
const primaryOrangeDark: string = "#C59A06";

// Define theme context interface
interface ThemeContextProps {
  theme: MD3Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create a default theme for the initial context value
const defaultLightTheme = createCustomTheme(false);

// Create a theme context with default values
export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultLightTheme,
  isDarkMode: false,
  toggleTheme: () => {},
});

// Define our custom theme
function createCustomTheme(isDark: boolean): MD3Theme {
  // Start with the default Material 3 themes as base
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...baseTheme,
    // Apply theme colors with proper contrasts for accessibility
    colors: {
      ...baseTheme.colors,
      // Primary colors
      primary: isDark ? primaryOrange : primaryBlue,
      primaryContainer: isDark ? "#382E00" : "#DDE5FF",
      onPrimary: "#FFFFFF",
      onPrimaryContainer: isDark ? "#FFE08C" : "#001452",

      // Secondary colors
      secondary: isDark ? primaryBlue : primaryOrange,
      secondaryContainer: isDark ? "#00164D" : "#FFECBA",
      onSecondary: "#FFFFFF",
      onSecondaryContainer: isDark ? "#DAE1FF" : "#3A2900",

      // Tertiary colors
      tertiary: isDark ? "#FFBA3B" : "#0054D2",
      tertiaryContainer: isDark ? "#524200" : "#D8E2FF",
      onTertiary: "#FFFFFF",
      onTertiaryContainer: isDark ? "#FFDF9E" : "#001A45",

      // Neutral colors - ensuring light theme has properly light backgrounds
      background: isDark ? "#1A1C1E" : "#FFFFFF",
      surface: isDark ? "#121416" : "#FFFFFF",
      surfaceVariant: isDark ? "#43474E" : "#F5F5F7",
      onSurfaceVariant: isDark ? "#C3C6CF" : "#43474E",
      outline: isDark ? "#8D9199" : "#73777F",
      outlineVariant: isDark ? "#43474E" : "#E0E2EC",

      // Error colors
      error: isDark ? "#FFB4AB" : "#BA1A1A",
      errorContainer: isDark ? "#93000A" : "#FFDAD6",
      onError: isDark ? "#690005" : "#FFFFFF",
      onErrorContainer: isDark ? "#FFDAD6" : "#410002",

      // Core interaction colors
      onBackground: isDark ? "#E2E2E6" : "#1A1C1E",
      onSurface: isDark ? "#E2E2E6" : "#1A1C1E",
      elevation: {
        level0: "transparent",
        level1: isDark ? "#1E1E1E" : "#FFFFFF",
        level2: isDark ? "#222222" : "#F8F8F8",
        level3: isDark ? "#272727" : "#F5F5F5",
        level4: isDark ? "#2C2C2C" : "#F0F0F0",
        level5: isDark ? "#313131" : "#EBEBEB",
      },
      inverseSurface: isDark ? "#E2E2E6" : "#2F3033",
      inverseOnSurface: isDark ? "#1A1C1E" : "#F1F0F4",
      inversePrimary: isDark ? "#0054D2" : "#B1C5FF",
      shadow: isDark ? "#000000" : "#000000",
      // Remove surfaceTint as it's not in the MD3Colors type
      scrim: isDark ? "#000000" : "#000000",
    },
    // You can customize more theme properties here
    fonts: {
      ...baseTheme.fonts,
      // Define custom fonts if needed
    },
    animation: {
      ...baseTheme.animation,
      // Customize animations if needed
    },
  };
}

// Define props for the theme provider
interface ThemeProviderProps {
  children: ReactNode;
}

// The theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the device color scheme
  const systemColorScheme = useColorScheme();

  // Get user's theme preference from the store
  const { themeMode, setThemeMode } = useThemeStore();

  // State to track dark mode - initialize with a direct calculation
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark"
  );

  // Create theme based on dark mode state
  const theme = createCustomTheme(isDarkMode);

  // Update theme when system theme or user preference changes
  useEffect(() => {
    // Calculate dark mode directly in the effect to avoid function reference issues
    const newIsDarkMode = themeMode === "system" 
      ? systemColorScheme === "dark" 
      : themeMode === "dark";
      
    setIsDarkMode(newIsDarkMode);
  }, [systemColorScheme, themeMode]);

  // Toggle theme function that can be passed to components
  const toggleTheme = (): void => {
    const newMode = isDarkMode ? "light" : "dark";
    setThemeMode(newMode);
  };

  // Create a theme context value with the theme and toggle function
  const themeContextValue: ThemeContextProps = {
    theme,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

// Create a hook for easy access to the theme
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
