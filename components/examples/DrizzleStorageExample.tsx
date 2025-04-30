import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createDrizzleStorage } from "@/lib/drizzleStorageAdapter";

// Define a simple counter store with persistence
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

// Create the store with persistence using our Drizzle adapter
const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      setValue: (value: number) => set({ count: value }),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => createDrizzleStorage("counter")),
    }
  )
);

export default function DrizzleStorageExample() {
  const theme = useTheme();
  const { count, increment, decrement, reset, setValue } = useCounterStore();
  const [inputValue, setInputValue] = useState("");
  const [isReady, setIsReady] = useState(false);

  // Allow the hydration to complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSetValue = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue)) {
      setValue(numValue);
      setInputValue("");
    }
  };

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Text>Loading persistent counter state...</Text>
      </View>
    );
  }

  return (
    <Card style={styles.card}>
      <Card.Title title="Drizzle Persistence Example" />
      <Card.Content>
        <Text style={styles.description}>
          This component demonstrates using Zustand with Drizzle storage persistence.
          The counter value is persisted in the database and will be restored across app restarts.
        </Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Count: {count}</Text>
          
          <View style={styles.buttonRow}>
            <Button mode="contained" onPress={decrement} style={styles.button}>
              - Decrement
            </Button>
            
            <Button mode="contained" onPress={increment} style={styles.button}>
              + Increment
            </Button>
          </View>
          
          <Button mode="outlined" onPress={reset} style={styles.resetButton}>
            Reset
          </Button>
          
          <View style={styles.inputContainer}>
            <TextInput
              label="Set Value"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="contained" onPress={handleSetValue} disabled={!inputValue}>
              Set
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginVertical: 8,
  },
  description: {
    marginBottom: 16,
    lineHeight: 22,
  },
  counterContainer: {
    alignItems: "center",
    padding: 16,
  },
  counterText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  resetButton: {
    width: "100%",
    marginBottom: 16,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});