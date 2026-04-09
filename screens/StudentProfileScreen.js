import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Card, Button, IconButton, Divider } from 'react-native-paper';

// Componentes personalizados
import ProfileHeader from './components/ProfileHeader';
import InfoCard from './components/InfoCard';
import SkillBadge from './components/SkillBadge';
import SocialButton from './components/SocialButton';

export default function ProfileScreen({ navigation, route }) {
  // Datos del alumno (podrían venir por parámetros)
  const studentData = {
    name: 'Luis Manuel Mazariegos',
    nickname: 'Luis',
    studentId: '20240001',
    email: 'luis.mazariegos@ejemplo.com',
    phone: '+52 123 456 7890',
    career: 'Ingeniería en Sistemas Computacionales',
    semester: '8vo Semestre',
    age: 22,
    location: 'Ciudad de México',
    bio: 'Apasionado por el desarrollo móvil y las tecnologías emergentes. Me encanta crear soluciones que impacten positivamente a las personas.',
    skills: ['React Native', 'Expo', 'JavaScript', 'Python', 'Django', 'Firebase'],
    hobbies: ['Programación', 'Videojuegos', 'Fotografía', 'Senderismo'],
    social: {
      github: 'https://github.com/luismazariegos',
      linkedin: 'https://linkedin.com/in/luismazariegos',
      twitter: 'https://twitter.com/luismazariegos',
      portfolio: 'https://luismazariegos.dev'
    }
  };

  const handleSocialPress = (url) => {
    if (url) {
      Linking.openURL(url).catch(() => {
        alert('No se pudo abrir el enlace');
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Cabecera con foto y nombre */}
        <ProfileHeader
          name={studentData.name}
          nickname={studentData.nickname}
          studentId={studentData.studentId}
          email={studentData.email}
          bio={studentData.bio}
        />

        {/* Información académica */}
        <InfoCard
          title="Información Académica"
          icon="school"
          items={[
            { label: 'Carrera', value: studentData.career },
            { label: 'Semestre', value: studentData.semester },
            { label: 'Edad', value: `${studentData.age} años` },
            { label: 'Ubicación', value: studentData.location },
          ]}
        />

        {/* Contacto */}
        <InfoCard
          title="Contacto"
          icon="phone"
          items={[
            { label: 'Email', value: studentData.email, isLink: true, onPress: () => handleSocialPress(`mailto:${studentData.email}`) },
            { label: 'Teléfono', value: studentData.phone, isLink: true, onPress: () => handleSocialPress(`tel:${studentData.phone}`) },
          ]}
        />

        {/* Habilidades Técnicas */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="code-tags" size={24} iconColor="#0d9488" />
              <Text style={styles.sectionTitle}>Habilidades Técnicas</Text>
            </View>
            <View style={styles.skillsContainer}>
              {studentData.skills.map((skill, index) => (
                <SkillBadge key={index} name={skill} />
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Hobbies / Intereses */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="heart" size={24} iconColor="#e11d48" />
              <Text style={styles.sectionTitle}>Intereses y Hobbies</Text>
            </View>
            <View style={styles.skillsContainer}>
              {studentData.hobbies.map((hobby, index) => (
                <SkillBadge key={index} name={hobby} color="#e11d48" />
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Redes Sociales */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <IconButton icon="share-variant" size={24} iconColor="#3b82f6" />
              <Text style={styles.sectionTitle}>Redes Sociales</Text>
            </View>
            <View style={styles.socialContainer}>
              <SocialButton
                icon="github"
                name="GitHub"
                color="#333"
                onPress={() => handleSocialPress(studentData.social.github)}
              />
              <SocialButton
                icon="linkedin"
                name="LinkedIn"
                color="#0077b5"
                onPress={() => handleSocialPress(studentData.social.linkedin)}
              />
              <SocialButton
                icon="twitter"
                name="Twitter"
                color="#1da1f2"
                onPress={() => handleSocialPress(studentData.social.twitter)}
              />
              <SocialButton
                icon="web"
                name="Portafolio"
                color="#0d9488"
                onPress={() => handleSocialPress(studentData.social.portfolio)}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Espacio inferior */}
        <View style={styles.bottomSpace} />

      </ScrollView>

      {/* Botón flotante para volver */}
      <IconButton
        icon="arrow-left"
        iconColor="#fff"
        containerColor="#0d9488"
        size={24}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a2332',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  bottomSpace: {
    height: 80,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});