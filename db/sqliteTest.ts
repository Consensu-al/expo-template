// Test file to debug SQLite issues
import * as React from 'react';
import { Button, Text, View } from 'react-native';

// Try different import methods
let directSQLite: any = null;
let importedSQLite: any = null;
let requireSQLite: any = null;
let dbInstance: any = null;

// Track import results
const importResults: Record<string, any> = {
  direct: { success: false, error: null, instance: null },
  imported: { success: false, error: null, instance: null },
  required: { success: false, error: null, instance: null }
};

// Try direct import
try {
  directSQLite = require('expo-sqlite');
  importResults.direct.success = !!directSQLite;
  if (directSQLite?.openDatabase) {
    importResults.direct.instance = directSQLite.openDatabase('test.db');
  }
} catch (error) {
  importResults.direct.error = `${error}`;
}

// Try import * as
try {
  import * as SQLite from 'expo-sqlite';
  importedSQLite = SQLite;
  importResults.imported.success = !!importedSQLite;
  if (importedSQLite?.openDatabase) {
    importResults.imported.instance = importedSQLite.openDatabase('test2.db');
  }
} catch (error) {
  importResults.imported.error = `${error}`;
}

// Try named import
try {
  import { openDatabase } from 'expo-sqlite';
  requireSQLite = { openDatabase };
  importResults.required.success = !!requireSQLite.openDatabase;
  if (requireSQLite.openDatabase) {
    importResults.required.instance = requireSQLite.openDatabase('test3.db');
  }
} catch (error) {
  importResults.required.error = `${error}`;
}

export function debugSQLite(): Record<string, any> {
  return {
    importResults,
    directSQLite,
    importedSQLite,
    requireSQLite
  };
}

export function SQLiteTestComponent(): React.ReactElement {
  const [results, setResults] = React.useState<string>("No test run yet");
  
  const runTest = async () => {
    try {
      const debug = debugSQLite();
      setResults(JSON.stringify(debug, null, 2));
    } catch (error) {
      setResults(`Test error: ${error}`);
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        SQLite Import Test
      </Text>
      <Button title="Run SQLite Test" onPress={runTest} />
      <Text style={{ marginTop: 20, fontFamily: 'monospace' }}>
        {results}
      </Text>
    </View>
  );
}