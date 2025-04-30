#!/usr/bin/env node

/**
 * Markdown to Component Generator
 * 
 * This script converts markdown files to React Native components.
 * It parses markdown files and generates JSX components that can be imported 
 * directly into the app with proper styling and theming support.
 */

const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Configure paths
const MARKDOWN_SOURCES = [
  {
    source: path.resolve(__dirname, '../README.md'),
    destination: path.resolve(__dirname, '../assets/generated/ReadmeContent.tsx'),
    componentName: 'ReadmeContent'
  },
  {
    source: path.resolve(__dirname, '../assets/markdown/example.md'),
    destination: path.resolve(__dirname, '../assets/generated/ExampleMarkdownContent.tsx'),
    componentName: 'ExampleMarkdownContent'
  }
  // Add more markdown files to convert here
];

// Ensure the destination directory exists
const OUTPUT_DIR = path.resolve(__dirname, '../assets/generated');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Convert markdown to JSX component
 */
function convertMarkdownToComponent(markdownPath, outputPath, componentName) {
  // Read markdown content
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  
  // Parse markdown to HTML
  const html = marked.parse(markdownContent);
  
  // Convert HTML to JSX-friendly format
  const jsxContent = convertHtmlToJsx(html);
  
  // Generate component file
  const componentContent = generateComponentCode(jsxContent, componentName);
  
  // Write component file
  fs.writeFileSync(outputPath, componentContent);
  
  console.log(`Generated component: ${outputPath}`);
}

/**
 * Convert HTML to JSX-friendly format
 */
function convertHtmlToJsx(html) {
  // Store code blocks for later processing with syntax highlighter
  // Replace code blocks with placeholders that will be converted back later
  const codeBlocks = [];
  let processedHtml = html.replace(/<pre><code(?:\s+class="language-([^"]*)")?>([^]*?)<\/code><\/pre>/g, (match, lang, code) => {
    // Store the original code and language
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push({
      code: code, 
      language: lang || 'typescript' // Default to typescript if no language specified
    });
    return placeholder;
  });
  
  // Escape inline code as well
  const inlineCodeBlocks = [];
  processedHtml = processedHtml.replace(/<code>([^]*?)<\/code>/g, (match, code) => {
    // Sanitize the inline code with extensive escaping
    const sanitizedCode = code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\$/g, '&#36;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
      .replace(/\(/g, '&#40;')
      .replace(/\)/g, '&#41;')
      .replace(/\[/g, '&#91;')
      .replace(/\]/g, '&#93;')
      .replace(/\./g, '&#46;'); // Escape dots to prevent property access
      
    // Store the sanitized inline code
    const placeholder = `__INLINE_CODE_${inlineCodeBlocks.length}__`;
    inlineCodeBlocks.push(sanitizedCode);
    return placeholder;
  });
  
  // Basic HTML to JSX conversion
  processedHtml = processedHtml
    // Convert HTML entities to JSX equivalents (except in code blocks)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Process lists specially to handle nesting and item counters
    // First handle ordered lists and their items
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, function(match, listContent) {
      // Replace each <li> in the ordered list with a proper View structure and use numbers
      let itemCount = 1;
      const processedItems = listContent.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, function(match, content) {
        return `<View style={styles.listItem}><Text style={styles.listItemNumber}>${itemCount++}.</Text><Text style={styles.listItemText}>${content}</Text></View>`;
      });
      return `<View style={styles.orderedList}>${processedItems}</View>`;
    })
    // Then handle unordered lists and their items
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, function(match, listContent) {
      // Replace each <li> in the unordered list with a proper View structure
      const processedItems = listContent.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, 
        '<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>$1</Text></View>'
      );
      return `<View style={styles.list}>${processedItems}</View>`;
    })
    // Catch any remaining <li> tags that might be outside proper lists
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>$1</Text></View>')
    // Convert HTML tags to JSX-friendly Text/View components
    .replace(/<h1>(.*?)<\/h1>/g, '<Text style={styles.heading1}>$1</Text>')
    .replace(/<h2>(.*?)<\/h2>/g, '<Text style={styles.heading2}>$1</Text>')
    .replace(/<h3>(.*?)<\/h3>/g, '<Text style={styles.heading3}>$1</Text>')
    .replace(/<h4>(.*?)<\/h4>/g, '<Text style={styles.heading4}>$1</Text>')
    .replace(/<h5>(.*?)<\/h5>/g, '<Text style={styles.heading5}>$1</Text>')
    .replace(/<h6>(.*?)<\/h6>/g, '<Text style={styles.heading6}>$1</Text>')
    .replace(/<p>(.*?)<\/p>/g, '<Text style={styles.paragraph}>$1</Text>')
    .replace(/<strong>(.*?)<\/strong>/g, '<Text style={styles.strong}>$1</Text>')
    .replace(/<em>(.*?)<\/em>/g, '<Text style={styles.italic}>$1</Text>')
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, '<TouchableOpacity onPress={() => Linking.openURL("$1")}><Text style={styles.link}>$2</Text></TouchableOpacity>')
    .replace(/<blockquote>(.*?)<\/blockquote>/gs, '<View style={styles.blockquote}><Text style={styles.blockquoteText}>$1</Text></View>')
    .replace(/<hr>/g, '<View style={styles.divider} />')
    // Handle tables by converting them to styled Views
    .replace(/<table>([\s\S]*?)<\/table>/g, '<View style={[styles.table, themedStyles.table]}>$1</View>')
    .replace(/<tr>([\s\S]*?)<\/tr>/g, '<View style={[styles.tableRow, themedStyles.tableRow]}>$1</View>')
    .replace(/<th>([\s\S]*?)<\/th>/g, '<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>$1</Text></View>')
    .replace(/<td>([\s\S]*?)<\/td>/g, '<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>$1</Text></View>')
    // Remove any remaining HTML tags that aren't supported in React Native
    .replace(/<\/?(?:table|thead|tbody|tr|td|th|ol|ul|li)[^>]*>/g, '');
  
  // Put code blocks back with syntax highlighting
  codeBlocks.forEach((codeObj, index) => {
    // Escape curly braces in code blocks after syntax highlighting detection
    // to prevent them from being interpreted as JSX expressions
    const escapedCode = codeObj.code
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;');
      
    // Split code by newlines and join with explicit newline characters
    const codeLines = escapedCode.split('\n').map(line => 
      line.trim() === '' ? ' ' : line // Replace empty lines with a space to maintain vertical spacing
    );
    
    // Create a ScrollView wrapped code block with explicit line rendering
    processedHtml = processedHtml.replace(
      `__CODE_BLOCK_${index}__`,
      `<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            ${codeLines.map((line, i) => 
              `<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-${i}"}>${line}</Text>`
            ).join('\n')}
          </View>
        </ScrollView>
      </View>`
    );
  });
  
  // Put inline code blocks back with special handling
  inlineCodeBlocks.forEach((code, index) => {
    processedHtml = processedHtml.replace(
      `__INLINE_CODE_${index}__`,
      `<Text selectable={true} style={styles.code}>${code}</Text>`
    );
  });
  
  return processedHtml;
}

/**
 * Generate component code
 */
function generateComponentCode(jsxContent, componentName) {
  return `
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * ${componentName}
 * 
 * Auto-generated from markdown content.
 * This component renders the markdown content with theme-aware styling.
 */
export default function ${componentName}({ theme }) {
  // Theme-specific code styling

  // Apply theme colors to styles
  const themedStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    heading1: {
      color: theme.colors.onBackground,
    },
    heading2: {
      color: theme.colors.onBackground,
    },
    heading3: {
      color: theme.colors.onBackground,
    },
    heading4: {
      color: theme.colors.onBackground,
    },
    heading5: {
      color: theme.colors.onBackground,
    },
    heading6: {
      color: theme.colors.onBackground,
    },
    paragraph: {
      color: theme.colors.onBackground,
    },
    link: {
      color: theme.colors.primary,
    },
    strong: {
      color: theme.colors.onBackground,
    },
    italic: {
      color: theme.colors.onBackground,
    },
    listItemText: {
      color: theme.colors.onBackground,
    },
    listItemBullet: {
      color: theme.colors.primary,
    },
    code: {
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.onSurfaceVariant,
    },
    codeBlockContainer: {
      backgroundColor: theme.dark ? '#1e1e1e' : '#f5f5f5',
    },
    codeBlock: {
      backgroundColor: theme.dark ? '#1e1e1e' : '#f5f5f5',
    },
    codeBlockText: {
      color: theme.dark ? '#f8f8f2' : '#24292e',
    },
    blockquoteText: {
      color: theme.colors.secondary,
    },
    divider: {
      backgroundColor: theme.colors.outlineVariant,
    },
    table: {
      borderColor: theme.dark ? '#555' : '#e0e0e0',
    },
    tableRow: {
      borderBottomColor: theme.dark ? '#555' : '#e0e0e0',
    },
    tableHeaderCell: {
      backgroundColor: theme.dark ? '#333' : '#f5f5f5',
    },
    tableCell: {
      backgroundColor: theme.colors.background,
    },
    tableHeaderText: {
      color: theme.colors.onBackground,
    },
    tableCellText: {
      color: theme.colors.onBackground,
    },
  };
  
  return (
    <View style={[styles.container, themedStyles.container]}>
      ${jsxContent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  heading2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 14,
  },
  heading3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  heading4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  heading5: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  heading6: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
  },
  strong: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    textDecorationLine: 'underline',
  },
  list: {
    marginVertical: 8,
    marginLeft: 8,
  },
  orderedList: {
    marginVertical: 8,
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  listItemBullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  listItemNumber: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
    minWidth: 20,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  code: {
    fontFamily: 'monospace',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  codeBlockContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  codeBlockScroll: {
    maxHeight: 300,
  },
  codeBlock: {
    padding: 16,
    paddingHorizontal: 12,
    flexDirection: 'column',
  },
  codeBlockText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 2,
  },
  blockquote: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginVertical: 8,
    borderLeftColor: '#ccc',
  },
  blockquoteText: {
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  // Table styles
  table: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCellText: {
    fontSize: 14,
  },
});
`;
}

// Process all markdown files
MARKDOWN_SOURCES.forEach(({ source, destination, componentName }) => {
  convertMarkdownToComponent(source, destination, componentName);
});

console.log('Markdown component generation complete!');