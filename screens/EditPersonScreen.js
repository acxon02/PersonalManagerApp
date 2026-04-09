import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  RadioButton,
  Text,
  Switch,
} from 'react-native-paper';
import { getPersonById, updatePerson } from '../services/personService';

export default function EditPersonScreen({ route, navigation }) {
  const { id } = route.params;
  const [formData, setFormData] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    sexo: '',
    estado_civil: '',
    curp: '',
    rfc: '',
    nss: '',
    email: '',
    telefono: '',
    celular: '',
    calle: '',
    numero_exterior: '',
    numero_interior: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigo_postal: '',
    fecha_ingreso: '',
    puesto: '',
    departamento: '',
    salario: '',
    contacto_emergencia_nombre: '',
    contacto_emergencia_telefono: '',
    contacto_emergencia_parentesco: '',
    activo: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPerson();
  }, []);

  const loadPerson = async () => {
    try {
      const person = await getPersonById(id);
      setFormData({
        nombres: person.nombres || '',
        apellido_paterno: person.apellido_paterno || '',
        apellido_materno: person.apellido_materno || '',
        fecha_nacimiento: person.fecha_nacimiento || '',
        sexo: person.sexo || '',
        estado_civil: person.estado_civil || '',
        curp: person.curp || '',
        rfc: person.rfc || '',
        nss: person.nss || '',
        email: person.email || '',
        telefono: person.telefono || '',
        celular: person.celular || '',
        calle: person.calle || '',
        numero_exterior: person.numero_exterior || '',
        numero_interior: person.numero_interior || '',
        colonia: person.colonia || '',
        ciudad: person.ciudad || '',
        estado: person.estado || '',
        codigo_postal: person.codigo_postal || '',
        fecha_ingreso: person.fecha_ingreso || '',
        puesto: person.puesto || '',
        departamento: person.departamento || '',
        salario: person.salario ? person.salario.toString() : '',
        contacto_emergencia_nombre: person.contacto_emergencia_nombre || '',
        contacto_emergencia_telefono: person.contacto_emergencia_telefono || '',
        contacto_emergencia_parentesco: person.contacto_emergencia_parentesco || '',
        activo: person.activo || false,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la persona');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (!formData.nombres.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'El email es obligatorio');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Ingresa un email válido');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const personData = {
        ...formData,
        salario: formData.salario ? parseFloat(formData.salario) : 0,
      };
      await updatePerson(id, personData);
      Alert.alert('Éxito', 'Personal actualizado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la persona');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0d9488" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
          <TextInput
            label="Nombres *"
            value={formData.nombres}
            onChangeText={(text) => handleChange('nombres', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Apellido Paterno"
            value={formData.apellido_paterno}
            onChangeText={(text) => handleChange('apellido_paterno', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Apellido Materno"
            value={formData.apellido_materno}
            onChangeText={(text) => handleChange('apellido_materno', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Fecha de Nacimiento"
            value={formData.fecha_nacimiento}
            onChangeText={(text) => handleChange('fecha_nacimiento', text)}
            mode="outlined"
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
          
          <Text style={styles.label}>Sexo</Text>
          <RadioButton.Group
            onValueChange={(value) => handleChange('sexo', value)}
            value={formData.sexo}
          >
            <View style={styles.radioRow}>
              <RadioButton value="M" />
              <Text>Masculino</Text>
              <RadioButton value="F" />
              <Text>Femenino</Text>
              <RadioButton value="O" />
              <Text>Otro</Text>
            </View>
          </RadioButton.Group>
          
          <TextInput
            label="CURP"
            value={formData.curp}
            onChangeText={(text) => handleChange('curp', text)}
            mode="outlined"
            maxLength={18}
            style={styles.input}
          />
          <TextInput
            label="RFC"
            value={formData.rfc}
            onChangeText={(text) => handleChange('rfc', text)}
            mode="outlined"
            maxLength={13}
            style={styles.input}
          />
          <TextInput
            label="NSS"
            value={formData.nss}
            onChangeText={(text) => handleChange('nss', text)}
            mode="outlined"
            maxLength={11}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.sectionTitle}>Contacto</Text>
          <TextInput
            label="Email *"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Teléfono"
            value={formData.telefono}
            onChangeText={(text) => handleChange('telefono', text)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            label="Celular"
            value={formData.celular}
            onChangeText={(text) => handleChange('celular', text)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Text style={styles.sectionTitle}>Dirección</Text>
          <TextInput
            label="Calle"
            value={formData.calle}
            onChangeText={(text) => handleChange('calle', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Número Exterior"
            value={formData.numero_exterior}
            onChangeText={(text) => handleChange('numero_exterior', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Número Interior"
            value={formData.numero_interior}
            onChangeText={(text) => handleChange('numero_interior', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Colonia"
            value={formData.colonia}
            onChangeText={(text) => handleChange('colonia', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Ciudad"
            value={formData.ciudad}
            onChangeText={(text) => handleChange('ciudad', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Estado"
            value={formData.estado}
            onChangeText={(text) => handleChange('estado', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Código Postal"
            value={formData.codigo_postal}
            onChangeText={(text) => handleChange('codigo_postal', text)}
            mode="outlined"
            maxLength={5}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.sectionTitle}>Datos Laborales</Text>
          <TextInput
            label="Fecha de Ingreso"
            value={formData.fecha_ingreso}
            onChangeText={(text) => handleChange('fecha_ingreso', text)}
            mode="outlined"
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
          <TextInput
            label="Puesto *"
            value={formData.puesto}
            onChangeText={(text) => handleChange('puesto', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Departamento *"
            value={formData.departamento}
            onChangeText={(text) => handleChange('departamento', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Salario"
            value={formData.salario}
            onChangeText={(text) => handleChange('salario', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.sectionTitle}>Contacto de Emergencia</Text>
          <TextInput
            label="Nombre Contacto"
            value={formData.contacto_emergencia_nombre}
            onChangeText={(text) => handleChange('contacto_emergencia_nombre', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Teléfono Emergencia"
            value={formData.contacto_emergencia_telefono}
            onChangeText={(text) => handleChange('contacto_emergencia_telefono', text)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            label="Parentesco"
            value={formData.contacto_emergencia_parentesco}
            onChangeText={(text) => handleChange('contacto_emergencia_parentesco', text)}
            mode="outlined"
            style={styles.input}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Personal Activo</Text>
            <Switch
              value={formData.activo}
              onValueChange={(value) => handleChange('activo', value)}
              color="#0d9488"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={saving}
              disabled={saving}
              style={styles.button}
            >
              Guardar Cambios
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
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
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d9488',
    marginTop: 20,
    marginBottom: 15,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5c6b7a',
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#1a2332',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 40,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});