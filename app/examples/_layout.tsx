import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function ExamplesLayout() {
  const theme = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="validation" 
        options={{ 
          title: 'Zod Validation Examples',
        }} 
      />
    </Stack>
  );
}