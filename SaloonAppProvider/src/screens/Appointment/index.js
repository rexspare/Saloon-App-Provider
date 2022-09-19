import { View, SafeAreaView, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import CommonStyles from '../../assets/styles/CommonStyles';
import {Text_type1} from '../../components';
import {width,COLORS,FONTS} from '../../utils/Common';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { lang } from '../../assets/languages';
import PendingOrders from '../PendingOrders';
import AcceptedOrders from '../AcceptedOrders';
import CancelledOrders from '../CancelledOrders';
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'

const TopTabs = createMaterialTopTabNavigator();

const Appointment = () => {

  const user = useSelector((state) => state.authReducer.user)

  // useEffect(() => {

  //     getPendingBookingHistory();

  //   }, [])

    // const getPendingBookingHistory = async () => {


    //   const result = await apiRequest({
    //     method: "POST",
    //     url: ROUTES.GET_BOOKING_HISTORY,
    //     data: { user_id: user.id, type: 'vendor', booking_status:'pending'}
    //   }).catch((err) => {
    //     showFlash("Network Error", "danger", 'auto',)
    //     return false;
    //   });
    //   if (result.data.message) {
    //     showFlash("Data Fetched", "success", 'auto')
    //     console.log("PENDING Cats ====>  ", result.data)
    //   }
    //   else {
    //   }
    // }


  const screenOptions = {
    activeTintColor: COLORS.pure_Black,
    inactiveTintColor: COLORS.pure_Black,
    indicatorStyle: { backgroundColor: COLORS.pure_White },
    pressOpacity: 1,
  };

  return (
    <SafeAreaView style={CommonStyles.container}>


      <View style={{ flex: 1 }}>
        <View style={styles.HeaderContainer}>
          <Text_type1 style={{ textAlign: 'left', color: COLORS.pure_White }}>Let's deal with the appointments.</Text_type1>
        </View>

        {
          <TopTabs.Navigator
            initialRouteName="PendingOrders"
            tabBarOptions={screenOptions}
            screenOptions={{
              tabBarLabelStyle: { fontSize: 13, fontFamily: FONTS.WorkSans_Medium, color: COLORS.pure_White },
              tabBarStyle: { backgroundColor: COLORS.pure_Black },
            }}>
            <TopTabs.Screen
              name="PendingOrders"
              component={PendingOrders}
              options={{ title: 'Pending' }}
            />
            <TopTabs.Screen
              name="AcceptedOrders"
              component={AcceptedOrders}
              options={{ title: 'Accepted' }}
            />
            <TopTabs.Screen
              name="CancelledOrders"
              component={CancelledOrders}
              options={{ title: 'Cancelled' }}
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
    backgroundColor: COLORS.pure_Black
  },

  sectionContainer: {
    // paddingHorizontal: '5%',
    marginBottom: 15,
    ...CommonStyles._center,
  },

});

export default Appointment