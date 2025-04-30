import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Card, Text, useTheme, IconButton, TextInput, Checkbox, List } from "react-native-paper";
import { useDatabase } from "@/db/provider";
import { eq } from "drizzle-orm";
import { todosTable, type Todo } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { FlashList } from "@shopify/flash-list";

/**
 * DatabaseExample component
 * 
 * This component demonstrates how to use the database integration in the app
 * with a simple to-do list example that uses direct database operations
 * without any state management library.
 */
export default function DatabaseExample() {
  const theme = useTheme();
  const { db, isDbReady } = useDatabase();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState("");
  
  // Load todos when component mounts
  useEffect(() => {
    if (isDbReady && db) {
      loadTodos();
    }
  }, [isDbReady, db]);
  
  // Load todos from database
  const loadTodos = async () => {
    if (!db) return;
    
    setIsLoading(true);
    try {
      const result = await db.select().from(todosTable).orderBy(todosTable.createdAt);
      setTodos(result);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add a new todo
  const addTodo = async () => {
    if (!db || !newTodoText.trim()) return;
    
    try {
      const newTodo = {
        id: createId(),
        title: newTodoText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      await db.insert(todosTable).values(newTodo);
      setNewTodoText("");
      loadTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  
  // Toggle todo completion status
  const toggleTodo = async (id: string, completed: boolean) => {
    if (!db) return;
    
    try {
      await db
        .update(todosTable)
        .set({ completed: !completed })
        .where(eq(todosTable.id, id));
      loadTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };
  
  // Delete a todo
  const deleteTodo = async (id: string) => {
    if (!db) return;
    
    try {
      await db
        .delete(todosTable)
        .where(eq(todosTable.id, id));
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  
  // Clear all todos
  const clearAllTodos = async () => {
    if (!db) return;
    
    try {
      await db.delete(todosTable);
      loadTodos();
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  };

  if (!isDbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16 }}>Initializing database...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="SQLite Database Example" subtitle="Simple Todo List" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.paragraph}>
            This example demonstrates direct database operations using Drizzle ORM
            with SQLite. Add, toggle, and delete todos to see database operations
            in action.
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              label="New Todo"
              value={newTodoText}
              onChangeText={setNewTodoText}
              style={styles.input}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="plus"
                  onPress={addTodo}
                  disabled={!newTodoText.trim()}
                />
              }
              onSubmitEditing={addTodo}
            />
          </View>
          
          {isLoading ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : todos.length === 0 ? (
            <Text style={styles.emptyMessage}>No todos yet. Add one above!</Text>
          ) : (
            <View style={styles.listContainer}>
              <FlashList
                data={todos}
                keyExtractor={(item) => item.id}
                estimatedItemSize={50}
                renderItem={({ item }) => (
                  <List.Item
                    title={item.title}
                    style={[
                      styles.todoItem,
                      item.completed && styles.completedTodo
                    ]}
                    left={() => (
                      <Checkbox
                        status={item.completed ? "checked" : "unchecked"}
                        onPress={() => toggleTodo(item.id, item.completed)}
                      />
                    )}
                    right={() => (
                      <IconButton
                        icon="delete"
                        onPress={() => deleteTodo(item.id)}
                      />
                    )}
                  />
                )}
              />
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            mode="outlined"
            onPress={loadTodos}
            icon="refresh"
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button
            mode="outlined"
            onPress={clearAllTodos}
            icon="delete-sweep"
            disabled={isLoading || todos.length === 0}
          >
            Clear All
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 16,
  },
  inputContainer: {
    marginVertical: 16,
  },
  input: {
    marginBottom: 8,
  },
  listContainer: {
    height: 300,
    marginTop: 8,
  },
  todoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  completedTodo: {
    opacity: 0.6,
  },
  emptyMessage: {
    textAlign: "center",
    marginVertical: 24,
    fontStyle: "italic",
  },
  errorContainer: {
    padding: 16,
  }
});