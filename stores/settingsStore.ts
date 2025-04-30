import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { settingsSchema, type Settings, defaultSettings } from "../schemas/settings";
import { createAsyncStorage } from "../lib/asyncStorageAdapter";

interface SettingsState {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
  updateSettings: <K extends keyof Settings>(
    section: K,
    values: Partial<Settings[K]>
  ) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      isLoading: false,
      error: null,

      updateSettings: <K extends keyof Settings>(
        section: K,
        values: Partial<Settings[K]>
      ) => {
        try {
          set({ error: null });
          
          const currentSettings = get().settings;
          
          const sectionValues = currentSettings[section] as object;
          const updatedSectionValues = {
            ...sectionValues,
            ...values,
          };
          
          const updatedSettings = {
            ...currentSettings,
            [section]: updatedSectionValues,
            lastUpdated: new Date(),
          };
          
          const validatedSettings = settingsSchema.parse(updatedSettings);
          
          // Update state
          set({ settings: validatedSettings });
          console.log(`Settings updated for section: ${String(section)}`);
        } catch (error) {
          console.error("Failed to update settings:", error);
          set({ error: error instanceof Error ? error.message : String(error) });
        }
      },

      resetSettings: () => {
        try {
          set({ error: null, settings: defaultSettings });
          console.log("Settings reset to defaults");
        } catch (error) {
          console.error("Failed to reset settings:", error);
          set({ error: error instanceof Error ? error.message : String(error) });
        }
      },
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => createAsyncStorage("settings")),
      partialize: (state) => ({ settings: state.settings }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Validate settings after rehydration
          try {
            // Helper function to ensure dates are properly converted
            const ensureDates = (settings: Partial<Settings>): Partial<Settings> => {
              // Create a copy to avoid modifying the original
              const result = { ...settings };
              
              // Convert lastUpdated if it's a string
              if (typeof result.lastUpdated === 'string') {
                try {
                  result.lastUpdated = new Date(result.lastUpdated);
                } catch (e) {
                  result.lastUpdated = new Date();
                }
              }
              
              // Convert sync.lastSyncedAt if it's a string
              if (result.sync && typeof result.sync.lastSyncedAt === 'string') {
                try {
                  result.sync = {
                    ...result.sync,
                    lastSyncedAt: new Date(result.sync.lastSyncedAt)
                  };
                } catch (e) {
                  result.sync.lastSyncedAt = null;
                }
              }
              
              return result;
            };
            
            // Process the stored settings to ensure dates are properly handled
            const processedSettings = ensureDates(state.settings);
            
            // Merge with defaults and validate
            const validatedSettings = settingsSchema.parse({
              ...defaultSettings,
              ...processedSettings,
            });
            
            state.settings = validatedSettings;
            state.isLoading = false;
            console.log("Settings rehydrated and validated");
          } catch (error) {
            console.error("Failed to validate settings after rehydration:", error);
            state.settings = defaultSettings;
            state.error = "Invalid settings data, reset to defaults";
            state.isLoading = false;
          }
        }
      },
    }
  ),
);