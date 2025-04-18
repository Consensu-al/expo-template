import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, List, Text, Divider } from 'react-native-paper';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      
      <Card style={styles.card}>
        <Card.Title title="App Information" />
        <Card.Content>
          <Text variant="bodyMedium">
            This app was created using the Consensual Expo Template, which provides a solid foundation
            for building React Native applications with Expo Router.
          </Text>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Technology Stack" />
        <Card.Content>
          <List.Item
            title="Expo & React Native"
            description="Framework for building native apps"
            left={(props) => <List.Icon {...props} icon="react" />}
          />
          <Divider />
          <List.Item
            title="Zustand"
            description="State management"
            left={(props) => <List.Icon {...props} icon="archive" />}
          />
          <Divider />
          <List.Item
            title="Zod"
            description="Data validation"
            left={(props) => <List.Icon {...props} icon="check-circle" />}
          />
          <Divider />
          <List.Item
            title="Drizzle & SQLite"
            description="Database management"
            left={(props) => <List.Icon {...props} icon="database" />}
          />
          <Divider />
          <List.Item
            title="React Native Paper"
            description="Material Design components"
            left={(props) => <List.Icon {...props} icon="material-design" />}
          />
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Version" />
        <Card.Content>
          <Text variant="bodyMedium">1.0.0</Text>
        </Card.Content>
      </Card>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});