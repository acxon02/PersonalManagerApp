import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

export default function SocialButton({ icon, name, color, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, { borderColor: color }]} onPress={onPress}>
      <IconButton icon={icon} size={20} iconColor={color} />
      <Text style={[styles.buttonText, { color }]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 4,
    minWidth: 100,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
});