import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  IconButton,
  ActivityIndicator,
  Chip,
  Divider,
} from 'react-native-paper';
import { getPersonById, toggleActive } from '../services/personService';

export default function DetailsPersonScreen({ route, navigation }) {
  const { id } = route.params;
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerson();
  }, []);

  const loadPerson = async () => {
    try {
      const data = await getPersonById(id);
      setPerson(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la persona');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      await toggleActive(person.id, !person.activo);
      Alert.alert('Éxito', `Personal ${person.activo ? 'desactivado' : 'activado'} correctamente`);
      loadPerson();
    } catch (error) {
      Alert.alert('Error', 'No se pudo cambiar el estado');
    }
  };

  const handleCall = (phone) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleEmail = (email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return 'No especificado';
    return `$${parseFloat(salary).toLocaleString()}`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0d9488" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  if (!person) {
    return (
      <View style={styles.centerContainer}>
        <Text>No se encontró la persona</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header con estado */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <IconButton icon="account-circle" size={80} iconColor="#0d9488" />
          <Text style={styles.fullName}>
            {person.nombres} {person.apellido_paterno} {person.apellido_materno || ''}
          </Text>
          <Chip
            icon={person.activo ? "check-circle" : "close-circle"}
            style={person.activo ? styles.activeChip : styles.inactiveChip}
            textStyle={styles.chipText}
          >
            {person.activo ? 'Activo' : 'Inactivo'}
          </Chip>
        </Card.Content>
      </Card>

      {/* Información Personal */}
      <Card style={styles.infoCard}>
        <Card.Title
          title="Información Personal"
          left={(props) => <IconButton {...props} icon="account" />}
        />
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <Text style={styles.value}>{formatDate(person.fecha_nacimiento)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Sexo:</Text>
            <Text style={styles.value}>
              {person.sexo === 'M' ? 'Masculino' : person.sexo === 'F' ? 'Femenino' : 'Otro'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Estado Civil:</Text>
            <Text style={styles.value}>{person.estado_civil || 'No especificado'}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>CURP:</Text>
            <Text style={styles.value}>{person.curp || 'No especificado'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>RFC:</Text>
            <Text style={styles.value}>{person.rfc || 'No especificado'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>NSS:</Text>
            <Text style={styles.value}>{person.nss || 'No especificado'}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Contacto */}
      <Card style={styles.infoCard}>
        <Card.Title
          title="Contacto"
          left={(props) => <IconButton {...props} icon="phone" />}
        />
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text
              style={[styles.value, styles.link]}
              onPress={() => handleEmail(person.email)}
            >
              {person.email}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text
              style={[styles.value, styles.link]}
              onPress={() => handleCall(person.telefono)}
            >
              {person.telefono || 'No especificado'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Celular:</Text>
            <Text
              style={[styles.value, styles.link]}
              onPress={() => handleCall(person.celular)}
            >
              {person.celular || 'No especificado'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Dirección */}
      <Card style={styles.infoCard}>
        <Card.Title
          title="Dirección"
          left={(props) => <IconButton {...props} icon="home" />}
        />
        <Card.Content>
          <Text style={styles.value}>
            {person.calle} {person.numero_exterior}
            {person.numero_interior ? ` Int. ${person.numero_interior}` : ''}
          </Text>
          <Text style={styles.value}>{person.colonia}</Text>
          <Text style={styles.value}>
            {person.ciudad}, {person.estado}
          </Text>
          <Text style={styles.value}>CP: {person.codigo_postal}</Text>
        </Card.Content>
      </Card>

      {/* Información Laboral */}
      <Card style={styles.infoCard}>
        <Card.Title
          title="Información Laboral"
          left={(props) => <IconButton {...props} icon="briefcase" />}
        />
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha de Ingreso:</Text>
            <Text style={styles.value}>{formatDate(person.fecha_ingreso)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Puesto:</Text>
            <Text style={styles.value}>{person.puesto}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Departamento:</Text>
            <Text style={styles.value}>{person.departamento}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Salario:</Text>
            <Text style={[styles.value, styles.salary]}>
              {formatSalary(person.salario)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Contacto de Emergencia */}
      {person.contacto_emergencia_nombre && (
        <Card style={styles.infoCard}>
          <Card.Title
            title="Contacto de Emergencia"
            left={(props) => <IconButton {...props} icon="alert" />}
          />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{person.contacto_emergencia_nombre}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text
                style={[styles.value, styles.link]}
                onPress={() => handleCall(person.contacto_emergencia_telefono)}
              >
                {person.contacto_emergencia_telefono}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Parentesco:</Text>
              <Text style={styles.value}>{person.contacto_emergencia_parentesco}</Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('EditPerson', { id: person.id })}
          style={styles.editButton}
          icon="pencil"
        >
          Editar
        </Button>
        <Button
          mode="outlined"
          onPress={handleToggleActive}
          style={styles.toggleButton}
          icon={person.activo ? "account-off" : "account-check"}
          textColor={person.activo ? '#dc2626' : '#10b981'}
        >
          {person.activo ? 'Desactivar' : 'Activar'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  headerCard: {
    margin: 16,
    elevation: 2,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a2332',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  activeChip: {
    backgroundColor: '#d1fae5',
  },
  inactiveChip: {
    backgroundColor: '#fee2e2',
  },
  chipText: {
    fontSize: 12,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5c6b7a',
  },
  value: {
    fontSize: 14,
    color: '#1a2332',
    flex: 1,
    textAlign: 'right',
  },
  link: {
    color: '#0d9488',
    textDecorationLine: 'underline',
  },
  salary: {
    fontWeight: 'bold',
    color: '#0d9488',
  },
  divider: {
    marginVertical: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 32,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#0d9488',
  },
  toggleButton: {
    flex: 1,
  },
});