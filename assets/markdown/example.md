# Markdown in React Native

This is an example of rendering markdown content in a React Native application. Markdown makes it easy to create rich documentation, guides, or content for your app.

## Features Supported

This markdown renderer supports:

- **Bold text** and *italic text*
- Lists (ordered and unordered)
- [Links](https://expo.dev)
- Code blocks with syntax highlighting

### Code Example

```typescript
// Sample TypeScript code with syntax highlighting
function greeting(name: string): string {
  return `Hello, ${name}!`;
}

// Usage
const message = greeting('Developer');
console.log(message); // Outputs: Hello, Developer!
```

### Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Bold/Italic | ✅ | Works as expected |
| Lists | ✅ | Both ordered and unordered |
| Code blocks | ✅ | With syntax highlighting |
| Tables | ✅ | With proper styling |
| Images | ⚠️ | Limited support |

## Implementation Details

The markdown rendering works by:

1. Converting the markdown to HTML using the `marked` library
2. Processing the HTML to convert it to React Native components
3. Applying theme-aware styling for both light and dark modes
4. Handling special cases like code blocks and tables

## Usage in Your App

To use this in your app:

```bash
# Add the dependencies
bun add marked

# Create the build script to process markdown
# See scripts/generate-markdown-components.js
```

Then import and use the generated component:

```tsx
import { MarkdownContent } from '@/generated/MarkdownContent';

function MyScreen() {
  const theme = useTheme();
  return <MarkdownContent theme={theme} />;
}
```

### Theming Support

The renderer automatically adapts to light and dark themes:

- Text colors follow your theme's text colors
- Code blocks have theme-specific background colors
- Tables have appropriate styling for both modes

---

This markdown renderer is perfect for:

* Documentation
* Tutorials
* Help screens
* Content that needs frequent updates