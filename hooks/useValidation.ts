import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateForm as validateFormUtil } from '@/schemas/formValidation';

/**
 * Custom hook for form validation with Zod
 * 
 * @param schema Zod schema to validate against
 * @param initialValues Initial form values
 * @returns Form state and helper methods
 */
export function useValidation<T extends z.ZodType>(
  schema: T,
  initialValues: Partial<z.infer<T>> = {}
) {
  // Form state
  const [values, setValues] = useState<Partial<z.infer<T>>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Update a single form field
  const setValue = useCallback(<K extends keyof z.infer<T>>(
    field: K, 
    value: z.infer<T>[K] | undefined
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    
    // Clear error for this field when user makes changes
    if (errors && errors[field as string]) {
      const newErrors = { ...errors };
      delete newErrors[field as string];
      setErrors(Object.keys(newErrors).length > 0 ? newErrors : null);
    }
  }, [errors]);

  // Mark a field as touched (for showing errors after user interaction)
  const setTouched = useCallback((field: keyof z.infer<T>, isTouched = true) => {
    setTouchedFields(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  // Reset form to initial or new values
  const resetForm = useCallback((newValues: Partial<z.infer<T>> = initialValues) => {
    setValues(newValues);
    setErrors(null);
    setTouchedFields({} as Record<string, boolean>);
    setIsSubmitting(false);
    setIsValid(false);
  }, [initialValues]);

  // Validate form without submission
  const validateFormData = useCallback(() => {
    const result = validateFormUtil(schema, values);
    setIsValid(result.success);
    
    if (!result.success) {
      setErrors(result.errors);
      return false;
    }
    
    setErrors(null);
    return true;
  }, [schema, values]);

  // Submit form with validation
  const handleSubmit = useCallback(
    async (onSubmit: (data: z.infer<T>) => void | Promise<void>) => {
      setIsSubmitting(true);
      
      try {
        const result = validateFormUtil(schema, values);
        
        if (!result.success) {
          setErrors(result.errors);
          setIsValid(false);
          return false;
        }
        
        setErrors(null);
        setIsValid(true);
        
        // Call onSubmit with validated data
        await onSubmit(result.data);
        return true;
      } catch (error) {
        // Handle unexpected errors
        console.error('Form submission error:', error);
        setErrors({ _form: 'An unexpected error occurred' });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, values]
  );

  // Helper for checking if a field has errors
  const hasError = useCallback(
    (field: keyof z.infer<T>) => {
      return !!(errors && errors[field as string] && touchedFields[field as string]);
    },
    [errors, touchedFields]
  );

  // Get the error message for a field
  const getError = useCallback(
    (field: keyof z.infer<T>): string | undefined => {
      if (!errors || !touchedFields[field as string]) return undefined;
      return errors[field as string];
    },
    [errors, touchedFields]
  );

  return {
    values,
    errors,
    touched: touchedFields,
    isSubmitting,
    isValid,
    setValue,
    setTouched,
    resetForm,
    validate: validateFormData,
    handleSubmit,
    hasError,
    getError,
  };
}

export default useValidation;