import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import CommonStyles from '../../assets/styles/CommonStyles';
import {
  Layout,
  Heading,
  Text_type1,
  Label,
  CurveHeader,
} from '../../components';
import {
  height,
  width,
  COLORS,
  FS_height,
  FS_val,
  FONTS,
} from '../../utils/Common';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { lang } from '../../assets/languages';
import Profile from '../Authentication/Profile';
import AddServices from '../AddServices/index'

const TopTabs = createMaterialTopTabNavigator();

const Appointment = () => {


  const tabBarOptions = {
    activeTintColor: COLORS.pure_Black,
    inactiveTintColor: COLORS.pure_Black,
    indicatorStyle: { backgroundColor: 'orange' },
    pressOpacity: 1,
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
    
   

      <View style={{flex:1}}>
        <View style={styles.HeaderContainer}>

            <Text_type1 style={{ textAlign: 'left', color: COLORS.pure_White }}>Let's deal with the appointments.</Text_type1>
        </View>

       

        {
        <TopTabs.Navigator
          initialRouteName="Profile"
          tabBarOptions={tabBarOptions}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 13,  fontFamily: FONTS.WorkSans_Medium, color:COLORS.pure_White },
            tabBarStyle: { backgroundColor: COLORS.pure_Black},
          }}>
          <TopTabs.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Inprocess' }}
          />
          <TopTabs.Screen
            name="AddServices"
            component={AddServices}
            options={{ title: 'Rejected' }}
          />
            <TopTabs.Screen
            name="AdServices"
            component={AddServices}
            options={{ title: 'Rejected' }}
          />
        </TopTabs.Navigator>
      }


      
        
        </View>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  HeaderContainer: {
    width: width,
    paddingHorizontal: '5%',
    paddingVertical: 25,
    ...CommonStyles._center,
    backgroundColor:COLORS.pure_Black
  },

  sectionContainer: {
    // paddingHorizontal: '5%',
    marginBottom: 15,
    ...CommonStyles._center,
  },
  
});

export default Appointment