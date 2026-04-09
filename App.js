import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import EditPersonScreen from './screens/EditPersonScreen';
import DetailsPersonScreen from './screens/DetailsPersonScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0d9488',
    accent: '#0f766e',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0d9488',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Gestión de Personal' }}
          />

          
          <Stack.Screen
            name="AddPerson"
            component={AddPersonScreen}
            options={{ title: 'Registrar Personal' }}
          />
          <Stack.Screen
            name="EditPerson"
            component={EditPersonScreen}
            options={{ title: 'Editar Personal' }}
          />
          <Stack.Screen
            name="DetailsPerson"
            component={DetailsPersonScreen}
            options={{ title: 'Detalles del Personal' }}
          />
          <Stack.Screen
            name="StudentProfile"
            component={StudentProfileScreen}
            options={{ title: 'Perfil del Alumno' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}