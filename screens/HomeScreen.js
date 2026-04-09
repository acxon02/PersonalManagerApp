import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Card,
  Text,
  FAB,
  IconButton,
  ActivityIndicator,
  Searchbar,
  Chip,
  Button,
  Divider,
} from 'react-native-paper';
import PersonCard from './components/PersonCard';
import ConfirmDialog from './components/ConfirmDialog';
import StatsScroller from './components/StatsScroller';
import { useFocusEffect } from '@react-navigation/native';
import { getPersons, deletePerson, toggleActive } from '../services/personService';

export default function HomeScreen({ navigation }) {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterDepto, setFilterDepto] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    inactivos: 0,
    departamentos: 0,
  });

  const loadPersons = async () => {
    try {
      console.log('🔄 Iniciando carga de datos...');
      const data = await getPersons();
      
      console.log('📦 Datos recibidos en HomeScreen:', data?.length);
      
      const personsArray = Array.isArray(data) ? data : [];
      setPersons(personsArray);
      applyFilters(personsArray, searchQuery, filterStatus, filterDepto);
      updateStats(personsArray);
      updateDepartamentos(personsArray);
      
      if (personsArray.length > 0) {
        console.log('✅ Datos cargados exitosamente');
      } else {
        console.log('⚠️ No hay datos para mostrar');
      }
    } catch (error) {
      console.error('❌ Error en loadPersons:', error);
      Alert.alert('Error', `No se pudieron cargar los datos: ${error.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateStats = (data) => {
    const total = data.length;
    const activos = data.filter(p => p.activo === true).length;
    const inactivos = total - activos;
    const departamentos = [...new Set(data.map(p => p.departamento).filter(Boolean))].length;
    setStats({ total, activos, inactivos, departamentos });
  };

  const updateDepartamentos = (data) => {
    const deptos = [...new Set(data.map(p => p.departamento).filter(Boolean))].sort();
    setDepartamentos(deptos);
  };

  const applyFilters = (data, query, status, depto) => {
    let filtered = [...data];

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(p =>
        (p.nombres && p.nombres.toLowerCase().includes(lowerQuery)) ||
        (p.apellido_paterno && p.apellido_paterno.toLowerCase().includes(lowerQuery)) ||
        (p.apellido_materno && p.apellido_materno.toLowerCase().includes(lowerQuery)) ||
        (p.curp && p.curp.toLowerCase().includes(lowerQuery)) ||
        (p.rfc && p.rfc.toLowerCase().includes(lowerQuery)) ||
        (p.email && p.email.toLowerCase().includes(lowerQuery))
      );
    }

    if (status === 'activos') {
      filtered = filtered.filter(p => p.activo === true);
    } else if (status === 'inactivos') {
      filtered = filtered.filter(p => p.activo === false);
    }

    if (depto) {
      filtered = filtered.filter(p => p.departamento === depto);
    }

    setFilteredPersons(filtered);
  };

  useFocusEffect(
    useCallback(() => {
      loadPersons();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadPersons();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(persons, query, filterStatus, filterDepto);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    applyFilters(persons, searchQuery, status, filterDepto);
  };

  const handleDeptoFilter = (depto) => {
    setFilterDepto(depto);
    applyFilters(persons, searchQuery, filterStatus, depto);
  };

  const handleDelete = async () => {
    if (!selectedPerson) return;
    
    try {
      await deletePerson(selectedPerson.id);
      Alert.alert('Éxito', 'Personal eliminado correctamente');
      setDeleteDialogVisible(false);
      loadPersons();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la persona');
    }
  };

  const handleToggleActive = async (person) => {
    try {
      await toggleActive(person.id, !person.activo);
      Alert.alert('Éxito', `Personal ${person.activo ? 'desactivado' : 'activado'} correctamente`);
      loadPersons();
    } catch (error) {
      Alert.alert('Error', 'No se pudo cambiar el estado');
    }
  };

  const renderPerson = ({ item }) => (
    <PersonCard
      person={item}
      onView={(p) => navigation.navigate('DetailsPerson', { id: p.id })}
      onEdit={(p) => navigation.navigate('EditPerson', { id: p.id })}
      onToggleActive={(p) => handleToggleActive(p)}
      onDelete={(p) => { setSelectedPerson(p); setDeleteDialogVisible(true); }}
    />
  );

  const renderStats = () => (
    <StatsScroller stats={stats} />
  );

  const renderFilters = () => (
    <Card style={styles.filtersCard}>
      <Card.Content>
        <Searchbar
          placeholder="Buscar por nombre, CURP, RFC..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          <Chip
            selected={filterStatus === 'todos'}
            onPress={() => handleStatusFilter('todos')}
            style={styles.filterChip}
          >
            Todos
          </Chip>
          <Chip
            selected={filterStatus === 'activos'}
            onPress={() => handleStatusFilter('activos')}
            style={styles.filterChip}
            icon="check-circle"
          >
            Activos
          </Chip>
          <Chip
            selected={filterStatus === 'inactivos'}
            onPress={() => handleStatusFilter('inactivos')}
            style={styles.filterChip}
            icon="close-circle"
          >
            Inactivos
          </Chip>
          <Chip
            selected={filterDepto === ''}
            onPress={() => handleDeptoFilter('')}
            style={styles.filterChip}
          >
            Todos los deptos
          </Chip>
          {departamentos.map(depto => (
            <Chip
              key={depto}
              selected={filterDepto === depto}
              onPress={() => handleDeptoFilter(depto)}
              style={styles.filterChip}
            >
              {depto}
            </Chip>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0d9488" />
        <Text style={styles.loadingText}>Cargando personal...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.debugBanner}>
        <Text style={styles.debugText}>DEBUG: Home montada — comprueba la consola para logs de API</Text>
      </View>
      {renderStats()}
      {renderFilters()}
      
      {filteredPersons.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconButton icon="account-off" size={64} iconColor="#94a3b8" />
          <Text style={styles.emptyText}>
            {persons.length === 0 ? 'No hay personal registrado' : 'No se encontraron resultados'}
          </Text>
          {persons.length > 0 && (
            <Text style={styles.emptySubText}>
              {persons.length} registros disponibles, prueba otros filtros
            </Text>
          )}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AddPerson')}
            style={styles.emptyButton}
          >
            Agregar personal
          </Button>
        </View>
      ) : (
        Platform.OS === 'web' ? (
          <ScrollView
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {filteredPersons.map(item => (
              <View key={item.id?.toString() || Math.random().toString()}>
                {renderPerson({ item })}
              </View>
            ))}
          </ScrollView>
        ) : (
          <FlatList
            data={filteredPersons}
            renderItem={renderPerson}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )
      )}

      <ConfirmDialog
        visible={deleteDialogVisible}
        onDismiss={() => setDeleteDialogVisible(false)}
        title="Confirmar eliminación"
        message={`¿Estás seguro de eliminar a ${selectedPerson?.nombres || ''} ${selectedPerson?.apellido_paterno || ''}? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddPerson')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  statsScroll: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    marginRight: 12,
    minWidth: 100,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2332',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#5c6b7a',
    marginTop: 2,
  },
  filtersCard: {
    margin: 16,
    elevation: 2,
  },
  searchbar: {
    marginBottom: 12,
    elevation: 0,
  },
  chipScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: 8,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a2332',
  },
  email: {
    fontSize: 13,
    color: '#5c6b7a',
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  activeChip: {
    backgroundColor: '#d1fae5',
  },
  inactiveChip: {
    backgroundColor: '#fee2e2',
  },
  deptoChip: {
    backgroundColor: '#e0e7ff',
  },
  chipText: {
    fontSize: 11,
  },
  salary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d9488',
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#5c6b7a',
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 5,
  },
  emptyButton: {
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0d9488',
  },
});