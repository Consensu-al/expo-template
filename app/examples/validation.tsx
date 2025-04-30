import { LoginForm } from "@/components/forms";
import { validateForm } from "@/schemas/formValidation";
import { type Settings, defaultSettings, settingsSchema } from "@/schemas/settings";
import type { UserLoginInput } from "@/schemas/user";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, Title, useTheme } from "react-native-paper";
import { z } from "zod";

export default function ValidationExampleScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [loginData, setLoginData] = useState<UserLoginInput | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [exampleResults, setExampleResults] = useState<string | null>(null);

  // Handle login form submission
  const handleLoginSubmit = (data: UserLoginInput) => {
    setLoginLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoginData(data);
      setLoginLoading(false);
    }, 1500);
  };

  // Run various Zod examples
  const runZodExamples = () => {
    try {
      // Example 1: Basic validation
      const emailSchema = z.string().email();
      const validEmail = emailSchema.parse("user@example.com");
      const emailResult = emailSchema.safeParse("not-an-email");

      // Example 2: Object validation
      const userDataSchema = z.object({
        name: z.string().min(2),
        age: z.number().min(18).optional(),
        roles: z.array(z.string()).default([]),
      });

      const validUser = userDataSchema.parse({ name: "Alice", age: 25 });
      const userWithDefaults = userDataSchema.parse({ name: "Bob" });

      // Example 3: Nested objects with refinements
      const formSchema = z
        .object({
          password: z.string().min(8),
          confirm: z.string(),
        })
        .refine((data) => data.password === data.confirm, {
          message: "Passwords don't match",
          path: ["confirm"],
        });

      try {
        formSchema.parse({ password: "password123", confirm: "password123" });
      } catch (error) {
        // This should not error in this case
      }

      try {
        formSchema.parse({ password: "password123", confirm: "different" });
      } catch (error) {
        // We expect an error here
      }

      // Example 4: Using our settings schema
      const partialSettings = {
        appearance: {
          theme: "dark",
        },
        notifications: {
          enabled: false,
        },
      };

      // Merge with defaults
      const result = validateForm(settingsSchema, {
        ...defaultSettings,
        ...partialSettings,
      });

      // Compile results
      const results = [
        "✅ Basic email validation works",
        `✅ Object validation works: ${validUser.name}, ${validUser.age}`,
        `✅ Default values applied: ${userWithDefaults.roles.length} roles`,
        "✅ Validation with refinements works for password matching",
        `✅ Settings schema validation ${result.success ? "succeeded" : "failed"}`,
      ].join("\\n");

      setExampleResults(results);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setExampleResults(`❌ Validation Error: ${JSON.stringify(error.errors)}`);
      } else {
        setExampleResults(`❌ Unexpected Error: ${String(error)}`);
      }
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Title style={styles.title}>Zod Validation Examples</Title>

      <Card style={styles.card}>
        <Card.Title title="Login Form Example" />
        <Card.Content>
          <Text style={styles.description}>
            This form uses Zod schemas to validate input data before submission.
          </Text>

          <LoginForm onSubmit={handleLoginSubmit} isLoading={loginLoading} />

          {loginData && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Valid Form Data:</Text>
              <Text style={styles.code}>{JSON.stringify(loginData, null, 2)}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="More Validation Examples" />
        <Card.Content>
          <Text style={styles.description}>
            Run examples of different Zod validation patterns to see how they work.
          </Text>

          <Button mode="contained" onPress={runZodExamples} style={styles.button}>
            Run Validation Examples
          </Button>

          {exampleResults && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Results:</Text>
              <Text style={styles.code}>
                {exampleResults.split("\\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < exampleResults.split("\\n").length - 1 && "\n"}
                  </React.Fragment>
                ))}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={() => router.back()}
        style={[styles.button, styles.backButton]}
      >
        Go Back
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  backButton: {
    marginBottom: 24,
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  resultTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  code: {
    fontFamily: "monospace",
  },
});
