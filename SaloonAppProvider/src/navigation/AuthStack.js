import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/Authentication';
import SignUp from '../screens/Authentication/SignUp';
import SignIn from '../screens/Authentication/SignIn';
import Verify from '../screens/Authentication/Verification.js';
import ForgotPassword from '../screens/Authentication/ForgotPassword.js';

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const AuthStack = () => {
  return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name='Verify' component={Verify} />
      </Stack.Navigator>
  );
};

export default AuthStack;
