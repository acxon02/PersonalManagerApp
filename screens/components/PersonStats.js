import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

export default function PersonStats({ person = {} }) {
  const salario = person.salario ? parseFloat(person.salario) : 0;
  const fechaIngreso = person.fecha_ingreso ? new Date(person.fecha_ingreso) : null;
  const años = fechaIngreso ? Math.max(0, new Date().getFullYear() - fechaIngreso.getFullYear()) : 0;
  const hasContacto = person.contacto_emergencia_nombre ? 1 : 0;

  const items = [
    { key: 'salario', icon: 'currency-usd', label: 'Salario', value: salario ? `$${salario.toLocaleString()}` : '$0' },
    { key: 'años', icon: 'calendar', label: 'Años', value: String(años) },
    { key: 'contacto', icon: 'phone', label: 'Contacto', value: String(hasContacto) },
  ];

  return (
    <View style={styles.container}>
      {items.map(item => (
        <View key={item.key} style={styles.item}>
          <View style={styles.row}>
            <IconButton icon={item.icon} size={20} iconColor="#0d9488" />
            <Text style={styles.value}>{item.value}</Text>
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  item: { alignItems: 'center', minWidth: 80 },
  row: { flexDirection: 'row', alignItems: 'center' },
  value: { fontSize: 14, fontWeight: '700', color: '#0d9488', marginLeft: 4 },
  label: { fontSize: 11, color: '#5c6b7a', marginTop: 2 },
});
