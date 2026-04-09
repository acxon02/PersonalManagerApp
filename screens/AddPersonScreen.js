import React, { useState } from 'react';
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
  Divider,
} from 'react-native-paper';
import { createPerson } from '../services/personService';

export default function AddPersonScreen({ navigation }) {
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
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Datos Personales', fields: ['nombres', 'apellido_paterno'] },
    { title: 'Contacto', fields: ['email', 'telefono', 'celular'] },
    { title: 'Dirección', fields: ['calle', 'numero_exterior', 'colonia', 'ciudad', 'estado', 'codigo_postal'] },
    { title: 'Datos Laborales', fields: ['fecha_ingreso', 'puesto', 'departamento', 'salario'] },
    { title: 'Emergencia', fields: ['contacto_emergencia_nombre', 'contacto_emergencia_telefono', 'contacto_emergencia_parentesco'] },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep = () => {
    const currentFields = steps[activeStep].fields;
    const requiredFields = ['nombres', 'apellido_paterno', 'email', 'telefono', 'puesto', 'departamento'];
    
    for (let field of currentFields) {
      if (requiredFields.includes(field) && !formData[field]?.trim()) {
        Alert.alert('Error', `El campo ${getFieldLabel(field)} es obligatorio`);
        return false;
      }
    }
    
    if (activeStep === 1 && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert('Error', 'Email no válido');
        return false;
      }
    }
    
    return true;
  };

  const getFieldLabel = (field) => {
    const labels = {
      nombres: 'Nombres',
      apellido_paterno: 'Apellido Paterno',
      email: 'Email',
      telefono: 'Teléfono',
      puesto: 'Puesto',
      departamento: 'Departamento',
    };
    return labels[field] || field;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const personData = {
        ...formData,
        salario: formData.salario ? parseFloat(formData.salario) : 0,
        activo: true,
      };
      await createPerson(personData);
      Alert.alert('Éxito', 'Personal registrado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el personal');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <View>
            <TextInput
              label="Nombres *"
              value={formData.nombres}
              onChangeText={(text) => handleChange('nombres', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Apellido Paterno *"
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
          </View>
        );
      case 1:
        return (
          <View>
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
              label="Teléfono *"
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
          </View>
        );
      case 2:
        return (
          <View>
            <TextInput
              label="Calle *"
              value={formData.calle}
              onChangeText={(text) => handleChange('calle', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Número Exterior *"
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
              label="Colonia *"
              value={formData.colonia}
              onChangeText={(text) => handleChange('colonia', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Ciudad *"
              value={formData.ciudad}
              onChangeText={(text) => handleChange('ciudad', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Estado *"
              value={formData.estado}
              onChangeText={(text) => handleChange('estado', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Código Postal *"
              value={formData.codigo_postal}
              onChangeText={(text) => handleChange('codigo_postal', text)}
              mode="outlined"
              maxLength={5}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <TextInput
              label="Fecha de Ingreso *"
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
          </View>
        );
      case 4:
        return (
          <View>
            <TextInput
              label="Nombre Contacto Emergencia *"
              value={formData.contacto_emergencia_nombre}
              onChangeText={(text) => handleChange('contacto_emergencia_nombre', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Teléfono Emergencia *"
              value={formData.contacto_emergencia_telefono}
              onChangeText={(text) => handleChange('contacto_emergencia_telefono', text)}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              label="Parentesco *"
              value={formData.contacto_emergencia_parentesco}
              onChangeText={(text) => handleChange('contacto_emergencia_parentesco', text)}
              mode="outlined"
              style={styles.input}
            />
          </View>
        );
      default:
        return null;
    }
  };

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
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepIndicator}>
              <View
                style={[
                  styles.stepCircle,
                  index <= activeStep && styles.stepCircleActive,
                  index < activeStep && styles.stepCircleCompleted,
                ]}
              >
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.stepLabel}>{step.title}</Text>
              {index < steps.length - 1 && <View style={styles.stepLine} />}
            </View>
          ))}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.formContainer}>
          <Text style={styles.stepTitle}>{steps[activeStep].title}</Text>
          {renderStepContent()}
        </View>

        <View style={styles.buttonContainer}>
          {activeStep > 0 && (
            <Button
              mode="outlined"
              onPress={prevStep}
              style={styles.button}
            >
              Anterior
            </Button>
          )}
          <Button
            mode="contained"
            onPress={nextStep}
            loading={loading && activeStep === steps.length - 1}
            disabled={loading}
            style={styles.button}
          >
            {activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
          </Button>
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
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: '#0d9488',
  },
  stepCircleCompleted: {
    backgroundColor: '#10b981',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: 15,
    right: -25,
    left: 25,
    height: 2,
    backgroundColor: '#e0e0e0',
  },
  divider: {
    marginVertical: 8,
  },
  formContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a2332',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});