import React, { useState, useEffect } from 'react'
import { Platform, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../utils/Common';
import Home from '../screens/Home'
import Appointment from '../screens/Appointment';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: "slide_from_right"
    }}>
      <Stack.Screen name='App' component={TabStack} />
      {/* ADD YOURSCREEN HERE */}
    </Stack.Navigator>

  )
}



const TabStack = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let keyboardEventListeners;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach(eventListener => eventListener.remove());
      }
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 55, display: visible ? "flex" : "none" },
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen name='Home' component={Home}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name={focused ? "ios-compass" : 'ios-compass-outline'}
                size={35}
                color={COLORS.secondary} />
            )
          }
        }} />
      <Tab.Screen name="Appointment" component={Appointment}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name={focused ? "ios-calendar" : 'ios-calendar-outline'}
                size={30}
                color={COLORS.secondary} />
            )
          }
        }} />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name={focused ? "person" : 'person-outline'}
                size={30}
                color={COLORS.secondary} />
            )
          }
        }} />
    </Tab.Navigator>

  )
}