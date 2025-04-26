import { z } from 'zod';

/**
 * Generic form validation helper
 * 
 * This function validates form data against a Zod schema and returns either:
 * - An object with { success: true, data: validatedData } 
 * - An object with { success: false, errors: { [field]: 'error message' } }
 * 
 * @param schema Zod schema to validate against
 * @param data Raw form data to validate
 * @returns Validation result object
 */
export function validateForm<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
  try {
    // Parse and validate the data
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a field -> message mapping
      const errorMap: Record<string, string> = {};
      
      for (const issue of error.errors) {
        // Get the field path (e.g., "user.email" becomes "email")
        const field = issue.path[issue.path.length - 1].toString();
        
        // Use the error message from Zod
        errorMap[field] = issue.message;
      }
      
      return { success: false, errors: errorMap };
    }
    
    // Handle unexpected errors
    console.error('Unexpected validation error:', error);
    return {
      success: false,
      errors: { _form: 'An unexpected error occurred during validation' },
    };
  }
}

/**
 * Example of form error extraction for React Native
 * 
 * Usage:
 * const { errorFor, hasErrors } = useFormErrors(errors);
 * ...
 * <TextInput error={!!errorFor('email')} />
 * {errorFor('email') && <HelperText type="error">{errorFor('email')}</HelperText>}
 */
export function useFormErrors(errors: Record<string, string> | null | undefined) {
  // Function to get error message for a specific field
  const errorFor = (field: string): string | undefined => {
    if (!errors) return undefined;
    return errors[field];
  };

  // Check if there are any errors
  const hasErrors = errors && Object.keys(errors).length > 0;

  return { errorFor, hasErrors };
}

/**
 * Common validation patterns
 */
export const validationPatterns = {
  // Username: letters, numbers, underscores, hyphens, 3-30 chars
  username: /^[a-zA-Z0-9_-]{3,30}$/,
  
  // Password: at least 8 chars, must include lowercase, uppercase, number
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  
  // Phone number: basic international format
  phone: /^\+?[1-9]\d{1,14}$/,
  
  // URL: basic web URL validation
  url: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};