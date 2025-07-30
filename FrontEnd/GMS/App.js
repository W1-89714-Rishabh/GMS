import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import SigninScreen from './Screens/Login';
import SignupScreen from './Screens/SignUp';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          
          <Stack.Screen
            name="Signin"
            component={SigninScreen}
            options={{ title: 'GMS Login' }} 
          />

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: 'Create Account' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
