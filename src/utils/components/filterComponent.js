import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilterComponent({ name }) {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={() => setSelected(prev => !prev)}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.2,
    borderColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
    alignSelf: 'flex-start',
  },
  selected: {
    borderColor: '#1E90FF', 
    backgroundColor: '#D6E4FF', 
  },
  text: {
    color: 'black',
    fontSize: 14,
    
  },
  textSelected: {
    color: '#1E90FF',
    fontWeight: '600',
  },
});
