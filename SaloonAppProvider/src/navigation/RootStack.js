import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { COLORS } from '../utils/Common';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

export default function RootStack() {
  const isUserLoggedIn = useSelector((state) =>state.authReducer.isUserLoggedIn)

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"
        backgroundColor={COLORS.secondary} />
      <Stack.Navigator screenOptions={screenOptionStyle}>
        {isUserLoggedIn ?
        <Stack.Screen name="AppStack" component={AppStack} />
        :  
        <Stack.Screen name="AuthStack" component={AuthStack} />
      } 
        

      </Stack.Navigator>

    </NavigationContainer>
  )
}