import axios from 'axios';
import { Platform } from 'react-native';

// Configuración automática según la plataforma
const getApiUrl = () => {
  // Para Android Emulador
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api';
  }
  
  // Para iOS Emulador
  if (Platform.OS === 'ios') {
    return 'http://localhost:8000/api';
  }
  
  // Para Web (navegador)
  if (Platform.OS === 'web') {
    return 'http://127.0.0.1:8000/api';
  }
  
  // Para dispositivo físico - CAMBIA ESTO POR TU IP
  return 'http://192.168.1.105:8000/api';
};

const API_URL = getApiUrl();

console.log('🔧 API Configurada para:', Platform.OS);
console.log('📍 URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Interceptor para debug
api.interceptors.request.use(
  config => {
    console.log('📤 Petición:', config.method.toUpperCase(), config.baseURL + config.url);
    return config;
  },
  error => {
    console.error('❌ Error en petición:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('📥 Respuesta:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('❌ Error respuesta:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;