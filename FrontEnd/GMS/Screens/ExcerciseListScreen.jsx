import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const exercises = [
  { id: '1', name: 'Push Ups', bodyPart: 'Chest' },
  { id: '2', name: 'Squats', bodyPart: 'Legs' },
  { id: '3', name: 'Pull Ups', bodyPart: 'Back' },
  { id: '4', name: 'Bicep Curls', bodyPart: 'Arms' },
  { id: '5', name: 'Plank', bodyPart: 'Core' },
];

export default function ExerciseListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.bodyPart}>{item.bodyPart}</Text>
    </TouchableOpacity>
  );
  <Button title="View Diet Plan" onPress={() => navigation.navigate('Diet')} />


  return (
    
 


    <View style={styles.container}>
      <Text style={styles.header}>Exercise List</Text>
      <FlatList
        data={exercises}
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
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  bodyPart: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});
