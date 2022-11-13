import React, { useState, useEffect } from 'react'
import { Platform, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../utils/Common';
import Home from '../screens/Home'
import Appointment from '../screens/Appointment';
import ProfileMain from '../screens/Profile'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddServices from '../screens/AddServices';
import ViewProfile from '../screens/Profile/ViewProfile';
import Setting from '../screens/Setting';
import AddUserBookings from '../screens/AddUserBookings';
import EditProfile from '../screens/EditProfile';
import Location from '../screens/Authentication/Location';
import Reviews from '../screens/Reviews';
import TermsConditions from '../screens/About/TermsConditions'
import PrivacyPolicy from '../screens/About/PrivacyPolicy'
import ChangePassword from '../screens/Setting/ChangePassword';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: "slide_from_right"
    }}>
      <Stack.Screen name='App' component={TabStack} />
      <Stack.Screen name='AddServices' component={AddServices} />
      <Stack.Screen name='ViewProfile' component={ViewProfile} />
      <Stack.Screen name='Setting' component={Setting} />
      <Stack.Screen name='AddUserBookings' component={AddUserBookings} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='EditLocation' component={Location} />
      <Stack.Screen name='Reviews' component={Reviews} />
      <Stack.Screen name='Terms' component={TermsConditions} />
      <Stack.Screen name='Privacy' component={PrivacyPolicy} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />

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
        tabBarStyle: { height: Platform.OS === 'ios' ? 75 : 55, display: visible ? "flex" : "none" },
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen name='Home' component={Home}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name={focused ? "calendar" : 'calendar'}
                size={30}
                color={COLORS.secondary} />
            )
          }
        }} />
      <Tab.Screen name="Appointment" component={Appointment}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialIcons
                name={focused ? "filter-list-alt" : 'filter-list-alt'}
                size={30}
                color={COLORS.secondary} />
            )
          }
        }} />
      <Tab.Screen name="ProfileMain" component={ProfileMain}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name={focused ? "md-person-circle-sharp" : 'md-person-circle-sharp'}
                size={33}
                color={COLORS.secondary} />
            )
          }
        }} />
    </Tab.Navigator>

  )
}