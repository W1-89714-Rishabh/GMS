import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const achievementsData = [
  { id: '1', title: 'Completed 10 Workouts', date: '2025-08-01' },
  { id: '2', title: 'Lost 5 kg Weight', date: '2025-07-20' },
  { id: '3', title: 'Ran 5 km in One Go', date: '2025-06-30' },
  { id: '4', title: 'Drank 2L Water Daily for a Week', date: '2025-06-25' },
];

export default function Achievements() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>🏆 {item.title}</Text>
      <Text style={styles.date}>Achieved on: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Achievements</Text>
      <FlatList
        data={achievementsData}
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
    backgroundColor: '#eef2f5',
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
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
