
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * ExampleMarkdownContent
 * 
 * Auto-generated from markdown content.
 * This component renders the markdown content with theme-aware styling.
 */
export default function ExampleMarkdownContent({ theme }) {
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
      <Text style={styles.heading1}>Markdown in React Native</Text>
<Text style={styles.paragraph}>This is an example of rendering markdown content in a React Native application. Markdown makes it easy to create rich documentation, guides, or content for your app.</Text>
<Text style={styles.heading2}>Features Supported</Text>
<Text style={styles.paragraph}>This markdown renderer supports:</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><Text style={styles.strong}>Bold text</Text> and <Text style={styles.italic}>italic text</Text></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Lists (ordered and unordered)</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}><TouchableOpacity onPress={() => Linking.openURL("https://expo.dev")}><Text style={styles.link}>Links</Text></TouchableOpacity></Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Code blocks with syntax highlighting</Text></View>
</View>
<Text style={styles.heading3}>Code Example</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>// Sample TypeScript code with syntax highlighting</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>function greeting(name: string): string &#123;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}>  return `Hello, __CODE_BLOCK_0__#123;name&#125;!`;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}>&#125;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}>// Usage</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}>const message = greeting(&#39;Developer&#39;);</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-7"}>console.log(message); // Outputs: Hello, Developer!</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-8"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading3}>Tables</Text>
<View style={[styles.table, themedStyles.table]}>

<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Feature</Text></View>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Supported</Text></View>
<View style={[styles.tableHeaderCell, themedStyles.tableHeaderCell]}><Text style={[styles.tableHeaderText, themedStyles.tableHeaderText]}>Notes</Text></View>
</View>

<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Bold/Italic</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>✅</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Works as expected</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Lists</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>✅</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Both ordered and unordered</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Code blocks</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>✅</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>With syntax highlighting</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Tables</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>✅</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>With proper styling</Text></View>
</View>
<View style={[styles.tableRow, themedStyles.tableRow]}>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Images</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>⚠️</Text></View>
<View style={[styles.tableCell, themedStyles.tableCell]}><Text style={[styles.tableCellText, themedStyles.tableCellText]}>Limited support</Text></View>
</View>
</View>
<Text style={styles.heading2}>Implementation Details</Text>
<Text style={styles.paragraph}>The markdown rendering works by:</Text>
<View style={styles.orderedList}>
<View style={styles.listItem}><Text style={styles.listItemNumber}>1.</Text><Text style={styles.listItemText}>Converting the markdown to HTML using the <Text selectable={true} style={styles.code}>marked</Text> library</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>2.</Text><Text style={styles.listItemText}>Processing the HTML to convert it to React Native components</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>3.</Text><Text style={styles.listItemText}>Applying theme-aware styling for both light and dark modes</Text></View>
<View style={styles.listItem}><Text style={styles.listItemNumber}>4.</Text><Text style={styles.listItemText}>Handling special cases like code blocks and tables</Text></View>
</View>
<Text style={styles.heading2}>Usage in Your App</Text>
<Text style={styles.paragraph}>To use this in your app:</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}># Add the dependencies</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}>bun add marked</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}># Create the build script to process markdown</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}># See scripts/generate-markdown-components.js</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.paragraph}>Then import and use the generated component:</Text>
<View style={[styles.codeBlockContainer, themedStyles.codeBlockContainer]}>
        <ScrollView horizontal={true} style={styles.codeBlockScroll}>
          <View style={[styles.codeBlock, themedStyles.codeBlock]}>
            <Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-0"}>import &#123; MarkdownContent &#125; from &#39;@/generated/MarkdownContent&#39;;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-1"}> </Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-2"}>function MyScreen() &#123;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-3"}>  const theme = useTheme();</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-4"}>  return &lt;MarkdownContent theme=&#123;theme&#125; /&gt;;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-5"}>&#125;</Text>
<Text selectable={true} style={[styles.codeBlockText, themedStyles.codeBlockText]} key={"line-6"}> </Text>
          </View>
        </ScrollView>
      </View>
<Text style={styles.heading3}>Theming Support</Text>
<Text style={styles.paragraph}>The renderer automatically adapts to light and dark themes:</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Text colors follow your theme's text colors</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Code blocks have theme-specific background colors</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Tables have appropriate styling for both modes</Text></View>
</View>
<View style={styles.divider} />
<Text style={styles.paragraph}>This markdown renderer is perfect for:</Text>
<View style={styles.list}>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Documentation</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Tutorials</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Help screens</Text></View>
<View style={styles.listItem}><Text style={styles.listItemBullet}>•</Text><Text style={styles.listItemText}>Content that needs frequent updates</Text></View>
</View>

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
