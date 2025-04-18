import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

export type Item = {
  id: string;
  title: string;
  description: string;
};

interface ItemState {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Omit<Item, 'id'>>) => void;
}

// Custom storage adapter for expo-secure-store
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useItemStore = create<ItemState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter((item) => item.id !== id) 
      })),
      
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map((item) => 
          item.id === id ? { ...item, ...updates } : item
        ),
      })),
    }),
    {
      name: 'item-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);