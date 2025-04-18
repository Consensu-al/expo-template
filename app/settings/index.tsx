import { useColorScheme } from 'react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, List, Switch, Text } from 'react-native-paper';
import { useState } from 'react';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataBackupEnabled, setDataBackupEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <Card style={styles.card}>
        <Card.Title title="App Preferences" />
        <Card.Content>
          <List.Item
            title="Theme"
            description={colorScheme === 'dark' ? 'Dark' : 'Light'}
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <Text>System</Text>}
          />
          <Divider />
          <List.Item
            title="Notifications"
            description="Enable push notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Data Backup"
            description="Backup app data to cloud"
            left={(props) => <List.Icon {...props} icon="cloud-upload" />}
            right={() => (
              <Switch
                value={dataBackupEnabled}
                onValueChange={setDataBackupEnabled}
              />
            )}
          />
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="Security" />
        <Card.Content>
          <List.Item
            title="Biometric Authentication"
            description="Use fingerprint or face ID"
            left={(props) => <List.Icon {...props} icon="fingerprint" />}
            right={() => (
              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Change Password"
            description="Update your account password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Title title="About" />
        <Card.Content>
          <List.Item
            title="App Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={(props) => <List.Icon {...props} icon="file-document" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
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