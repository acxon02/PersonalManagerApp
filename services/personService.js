import api from './api';

export const getPersons = async () => {
  try {
    const response = await api.get('/personal/');
    
    console.log('========== DEBUG API ==========');
    console.log('Status:', response.status);
    console.log('Data type:', typeof response.data);
    
    let personsArray = [];
    
    // Tu API devuelve { count: 3, results: [...] }
    if (response.data && response.data.results && Array.isArray(response.data.results)) {
      personsArray = response.data.results;
      console.log('✅ Cargados', personsArray.length, 'registros de results');
    } 
    // Si es array directo
    else if (Array.isArray(response.data)) {
      personsArray = response.data;
      console.log('✅ Cargados', personsArray.length, 'registros de array directo');
    } 
    // Si es un objeto único
    else if (response.data && typeof response.data === 'object') {
      personsArray = [response.data];
      console.log('✅ Cargado 1 registro de objeto único');
    }
    
    // Mostrar primeros datos
    if (personsArray.length > 0) {
      console.log('📊 Primer registro:', {
        id: personsArray[0].id,
        nombre: `${personsArray[0].nombres} ${personsArray[0].apellido_paterno}`,
        email: personsArray[0].email,
        activo: personsArray[0].activo
      });
    } else {
      console.log('⚠️ No hay datos en la API');
    }
    
    console.log('===============================');
    
    return personsArray;
  } catch (error) {
    console.error('❌ Error en getPersons:', error);
    throw error;
  }
};

export const getPersonById = async (id) => {
  try {
    const response = await api.get(`/personal/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPerson = async (personData) => {
  try {
    const response = await api.post('/personal/', personData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePerson = async (id, personData) => {
  try {
    const response = await api.put(`/personal/${id}/`, personData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePerson = async (id) => {
  try {
    const response = await api.delete(`/personal/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleActive = async (id, activo) => {
  try {
    const response = await api.patch(`/personal/${id}/`, { activo });
    return response.data;
  } catch (error) {
    throw error;
  }
};