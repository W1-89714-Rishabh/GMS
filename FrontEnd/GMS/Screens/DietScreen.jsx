import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dietData = [
  { id: '1', meal: 'Breakfast', items: 'Oats, Banana, Milk' },
  { id: '2', meal: 'Mid-Morning Snack', items: 'Almonds, Apple' },
  { id: '3', meal: 'Lunch', items: 'Brown Rice, Dal, Salad' },
  { id: '4', meal: 'Evening Snack', items: 'Green Tea, Boiled Egg' },
  { id: '5', meal: 'Dinner', items: 'Chapati, Vegetables, Curd' },
];

export default function DietScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.meal}>{item.meal}</Text>
      <Text style={styles.items}>{item.items}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Diet Plan 🍎</Text>
      <FlatList
        data={dietData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  meal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  items: {
    fontSize: 14,
    color: '#555',
  },
});
