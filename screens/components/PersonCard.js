import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Chip, IconButton, Menu } from 'react-native-paper';

export default function PersonCard({ person, onView, onEdit, onToggleActive, onDelete }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{person.nombres} {person.apellido_paterno} {person.apellido_materno || ''}</Text>
            <Text style={styles.email}>{person.email}</Text>
            <View style={styles.badgeContainer}>
              <Chip
                icon={person.activo ? 'check-circle' : 'close-circle'}
                style={person.activo ? styles.activeChip : styles.inactiveChip}
                textStyle={styles.chipText}
              >
                {person.activo ? 'Activo' : 'Inactivo'}
              </Chip>
              <Chip icon="briefcase" style={styles.deptoChip}>{person.departamento || 'Sin departamento'}</Chip>
            </View>
            {person.salario && <Text style={styles.salary}>${parseFloat(person.salario).toLocaleString()}</Text>}
          </View>

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton icon="dots-vertical" size={24} onPress={() => setMenuVisible(true)} />
            }
          >
            <Menu.Item icon="eye" onPress={() => { setMenuVisible(false); onView && onView(person); }} title="Ver detalles" />
            <Menu.Item icon="pencil" onPress={() => { setMenuVisible(false); onEdit && onEdit(person); }} title="Editar" />
            <Menu.Item icon={person.activo ? 'account-off' : 'account-check'} onPress={() => { setMenuVisible(false); onToggleActive && onToggleActive(person); }} title={person.activo ? 'Desactivar' : 'Activar'} />
            <Menu.Item icon="delete" onPress={() => { setMenuVisible(false); onDelete && onDelete(person); }} title="Eliminar" titleStyle={{ color: '#dc2626' }} />
          </Menu>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  infoContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#1a2332' },
  email: { fontSize: 13, color: '#5c6b7a', marginTop: 4 },
  badgeContainer: { flexDirection: 'row', marginTop: 8, gap: 8 },
  activeChip: { backgroundColor: '#d1fae5' },
  inactiveChip: { backgroundColor: '#fee2e2' },
  deptoChip: { backgroundColor: '#e0e7ff' },
  chipText: { fontSize: 11 },
  salary: { fontSize: 14, fontWeight: 'bold', color: '#0d9488', marginTop: 8 },
});
