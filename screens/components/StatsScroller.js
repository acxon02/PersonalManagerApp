import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

export default function StatsScroller({ stats = {} }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <IconButton icon="account-group" size={32} iconColor="#3b82f6" />
          <Text style={styles.statValue}>{stats.total || 0}</Text>
          <Text style={styles.statLabel}>Total Personal</Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <IconButton icon="check-circle" size={32} iconColor="#10b981" />
          <Text style={styles.statValue}>{stats.activos || 0}</Text>
          <Text style={styles.statLabel}>Activos</Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <IconButton icon="close-circle" size={32} iconColor="#ef4444" />
          <Text style={styles.statValue}>{stats.inactivos || 0}</Text>
          <Text style={styles.statLabel}>Inactivos</Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <IconButton icon="office-building" size={32} iconColor="#8b5cf6" />
          <Text style={styles.statValue}>{stats.departamentos || 0}</Text>
          <Text style={styles.statLabel}>Departamentos</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statsScroll: { paddingHorizontal: 16, marginTop: 16 },
  statCard: { marginRight: 12, minWidth: 100, alignSelf: 'flex-start' },
  statContent: { alignItems: 'center', paddingVertical: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1a2332', marginTop: 4 },
  statLabel: { fontSize: 12, color: '#5c6b7a', marginTop: 2 },
});
