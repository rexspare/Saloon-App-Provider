import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { COLORS } from '../utils/Common';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

export default function RootStack() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"
        backgroundColor={COLORS.secondary} />
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}