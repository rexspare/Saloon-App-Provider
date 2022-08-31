import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { COLORS } from '../utils/Common';
import Home from '../screens/Home'
import Appointment from '../screens/Appointment';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthScreen from '../screens/Authentication';
import AuthStack from './AuthStack';


const Tab = createBottomTabNavigator();
export default function RootStack() {

  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"}
        backgroundColor={COLORS.secondary } />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: {},
          tabBarStyle: { height: 60 }
        }}
        sceneContainerStyle={{}}
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
        <Tab.Screen name="Profile" component={AuthStack}
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
    </NavigationContainer>
  )
}