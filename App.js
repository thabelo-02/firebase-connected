import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { init } from './database/db';
import LoginScreen from './screens/LoginScreen';
import StudentHomeScreen from './screens/StudentHomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminPane from './screens/AdminPanelScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LandlordScreen from './screens/Landlord';

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={StudentHomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
        <Stack.Screen name="Payments" component={PaymentsScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Landlord" component={LandlordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}