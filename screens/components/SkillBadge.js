import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';

export default function SkillBadge({ name, color = '#0d9488' }) {
  // Colores según el tipo
  const getColorScheme = () => {
    if (color === '#e11d48') {
      return styles.pinkChip;
    }
    return styles.defaultChip;
  };

  return (
    <Chip
      icon="code-tags"
      style={[styles.chip, getColorScheme()]}
      textStyle={styles.chipText}
    >
      {name}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 0,
  },
  defaultChip: {
    backgroundColor: '#d1fae5',
  },
  pinkChip: {
    backgroundColor: '#fce7f3',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
});