import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import SigninScreen from './Screens/SigninScreen';
import SignupScreen from './Screens/SignupScreen';
//import HomeTabs from './HomeTabs';

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
          
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;