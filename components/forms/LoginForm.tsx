import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { userLoginSchema, type UserLoginInput } from '@/schemas/user';
import { validateForm, useFormErrors } from '@/schemas/formValidation';

interface LoginFormProps {
  onSubmit: (data: UserLoginInput) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const theme = useTheme();
  const [values, setValues] = useState<Partial<UserLoginInput>>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const { errorFor, hasErrors } = useFormErrors(errors);

  const handleChange = (field: keyof UserLoginInput) => (value: string | boolean) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field when user makes changes
    if (errors && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(Object.keys(newErrors).length > 0 ? newErrors : null);
    }
  };

  const handleSubmit = () => {
    // Validate form data against schema
    const result = validateForm(userLoginSchema, values);
    
    if (!result.success) {
      // Set validation errors
      setErrors(result.errors);
      return;
    }
    
    // Clear errors and submit valid data
    setErrors(null);
    onSubmit(result.data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={values.email as string || ''}
        onChangeText={handleChange('email')}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
        error={!!errorFor('email')}
        disabled={isLoading}
        left={<TextInput.Icon icon="email" />}
      />
      {errorFor('email') && <HelperText type="error">{errorFor('email')}</HelperText>}

      <TextInput
        label="Password"
        value={values.password as string || ''}
        onChangeText={handleChange('password')}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        error={!!errorFor('password')}
        disabled={isLoading}
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon="eye" />}
      />
      {errorFor('password') && <HelperText type="error">{errorFor('password')}</HelperText>}

      <View style={styles.checkboxContainer}>
        {/* You would replace this with an actual checkbox component */}
        <Button
          mode={values.rememberMe ? "contained" : "outlined"}
          onPress={() => handleChange('rememberMe')(!values.rememberMe)}
          icon="checkbox-marked"
          compact
          style={styles.checkbox}
          disabled={isLoading}
        >
          Remember me
        </Button>
      </View>

      {errorFor('_form') && (
        <HelperText type="error">{errorFor('_form')}</HelperText>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}
      >
        Log In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
});