import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton, Divider } from 'react-native-paper';

export default function InfoCard({ title, icon, items }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.titleContainer}>
          <IconButton icon={icon} size={22} iconColor="#0d9488" />
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        {items.map((item, index) => (
          <View key={index}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{item.label}</Text>
              {item.isLink ? (
                <TouchableOpacity onPress={item.onPress}>
                  <Text style={[styles.value, styles.linkValue]}>{item.value}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.value}>{item.value}</Text>
              )}
            </View>
            {index < items.length - 1 && <Divider style={styles.itemDivider} />}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a2332',
  },
  divider: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#5c6b7a',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#1a2332',
    flex: 1,
    textAlign: 'right',
  },
  linkValue: {
    color: '#0d9488',
    textDecorationLine: 'underline',
  },
  itemDivider: {
    marginVertical: 4,
  },
});