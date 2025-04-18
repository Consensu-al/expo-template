import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { createId } from '@paralleldrive/cuid2';
import { useItemStore } from '../../stores/itemStore';

export default function HomeScreen() {
  const { items, addItem, removeItem } = useItemStore();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Add some initial items if none exist
    if (items.length === 0) {
      addItem({
        id: createId(),
        title: 'Welcome to your template',
        description: 'This is an example item. You can customize this screen to fit your needs.'
      });
      
      addItem({
        id: createId(),
        title: 'Using Zustand for state management',
        description: 'This example uses Zustand to manage state across components.'
      });
    }
  }, []);

  const handleAddRandomItem = () => {
    const newItem = {
      id: createId(),
      title: `Item ${Math.floor(Math.random() * 1000)}`,
      description: 'This is a randomly generated item. Tap to remove it.'
    };
    
    addItem(newItem);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Example Content</Text>
      <FlashList
        data={items}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id}
        extraData={refreshKey}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => {
            removeItem(item.id);
            setRefreshKey(prev => prev + 1);
          }}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text variant="bodyMedium">{item.description}</Text>
            </Card.Content>
          </Card>
        )}
      />
      <Button 
        mode="contained" 
        onPress={handleAddRandomItem} 
        style={styles.addButton}
        icon="plus"
      >
        Add Random Item
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: 28,
  },
});
