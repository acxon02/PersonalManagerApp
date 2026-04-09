import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, Avatar, IconButton } from 'react-native-paper';

export default function ProfileHeader({ name, nickname, studentId, email, bio }) {
  // Obtener iniciales para el avatar
  const getInitials = () => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`;
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card style={styles.headerCard}>
      <Card.Content style={styles.headerContent}>
        
        {/* Avatar con iniciales */}
        <Avatar.Text 
          size={100} 
          label={getInitials()} 
          style={styles.avatar}
          labelStyle={styles.avatarText}
        />
        
        {/* Información del alumno */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nickname}>@{nickname}</Text>
        
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <IconButton icon="badge-account" size={16} iconColor="#0d9488" />
            <Text style={styles.badgeText}>ID: {studentId}</Text>
          </View>
          <View style={styles.badge}>
            <IconButton icon="email" size={16} iconColor="#0d9488" />
            <Text style={styles.badgeText}>{email}</Text>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <Text style={styles.bio}>{bio}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
    borderRadius: 16,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    backgroundColor: '#0d9488',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2332',
    textAlign: 'center',
  },
  nickname: {
    fontSize: 14,
    color: '#0d9488',
    textAlign: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#1e3a8a',
    marginRight: 8,
  },
  divider: {
    marginVertical: 16,
    width: '100%',
  },
  bio: {
    fontSize: 14,
    color: '#5c6b7a',
    textAlign: 'center',
    lineHeight: 20,
  },
});