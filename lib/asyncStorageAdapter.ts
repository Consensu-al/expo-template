import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

/**
 * Creates an AsyncStorage adapter for Zustand persist middleware
 * 
 * @param namespace A unique namespace prefix for the store to avoid key collisions
 * @returns A StateStorage compatible adapter for Zustand
 */
export const createAsyncStorage = (namespace: string): StateStorage => {
  // Create a prefixed key to avoid collisions with other data
  const createKey = (name: string) => `zustand-${namespace}-${name}`;

  return {
    getItem: async (name: string): Promise<string | null> => {
      try {
        const key = createKey(name);
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (error) {
        console.error(`Error loading "${namespace}" store from AsyncStorage:`, error);
        return null;
      }
    },
    
    setItem: async (name: string, value: string): Promise<void> => {
      try {
        const key = createKey(name);
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error saving "${namespace}" store to AsyncStorage:`, error);
      }
    },
    
    removeItem: async (name: string): Promise<void> => {
      try {
        const key = createKey(name);
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing "${namespace}" store from AsyncStorage:`, error);
      }
    },
  };
};