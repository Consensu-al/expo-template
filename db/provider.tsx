import React, { type PropsWithChildren, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { initialize, getDb } from "./drizzle";

type ContextType = {
  db: any;
  isDbReady: boolean;
  error: Error | null;
  isInitializing: boolean;
  setDatabaseReady: () => void;
};

export const DatabaseContext = React.createContext<ContextType>({
  db: null,
  isDbReady: false,
  error: null,
  isInitializing: false,
  setDatabaseReady: () => {}, // Default implementation
});

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState(null);
  const [isDbReady, setIsDbReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize database on component mount
  useEffect(() => {
    let isMounted = true;
    
    const initDb = async () => {
      try {
        setIsInitializing(true);
        const database = await initialize();
        
        if (isMounted) {
          setDb(database);
          console.log("Database initialized successfully");
        }
      } catch (err) {
        console.error("Database initialization error:", err);
        
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    initDb();

    return () => {
      isMounted = false;
    };
  }, []);

  // Function to mark database as ready after migrations
  const setDatabaseReady = () => {
    setIsDbReady(true);
  };

  // Context value with database state
  const contextValue = React.useMemo(
    () => ({
      db: db || getDb(), // Use singleton instance as fallback
      isDbReady,
      isInitializing,
      error,
      setDatabaseReady,
    }),
    [db, isDbReady, isInitializing, error]
  );

  // Show error state if database initialization failed
  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red' }}>
          Database Error: {error.message}
        </Text>
      </View>
    );
  }

  return <DatabaseContext.Provider value={contextValue}>{children}</DatabaseContext.Provider>;
}