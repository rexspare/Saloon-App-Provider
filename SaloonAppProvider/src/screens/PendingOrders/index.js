import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'
import { useFocusEffect } from '@react-navigation/native';

export default function PendingOrders() {

    const user = useSelector((state) => state.authReducer.user)

    useFocusEffect(() => {
console.log("HEREs");
        getPendingBookingHistory()

      })


      const getPendingBookingHistory = async () => {


        const result = await apiRequest({
          method: "POST",
          url: ROUTES.GET_BOOKING_HISTORY,
          data: { user_id: user.id, type: 'vendor', booking_status:'pending'}
        }).catch((err) => {
          showFlash("Network Error", "danger", 'auto',)
          return false;
        });
        if (result.data.message) {
       
          showFlash("Pending Orders Fetched", "success", 'auto')
          console.log("PENDING Cats ====>  ", result.data)
        }
        else {
        }
      }

  return (
    <View>
      <Text>Pending</Text>
    </View>
  )
}

const styles = StyleSheet.create({})