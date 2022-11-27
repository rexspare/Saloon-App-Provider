import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useDispatch, useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'
import { useFocusEffect } from '@react-navigation/native';
import AppointmentsItemRender from '../../components/AppointmentsItemRender';
import { Label } from '../../components';
import { width, FS_height, FONTS, COLORS } from '../../utils/Common';
import { getPendingBookingHistory } from '../../Data/Local/Store/Actions';



export default function PendingOrders(props) {
  const {navigation} = props

  const allPendingOrders = useSelector((state) => state.authReducer.allPendingOrders)
  const user = useSelector((state) => state.authReducer.user)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getPendingBookingHistory(user?.id))
  // }, [])
  useEffect(() => {
    const unsubsribe = navigation.addListener("focus", () => {
      dispatch(getPendingBookingHistory(user?.id))
    });
    return unsubsribe;
  }, []);
  

  const updatePendingStatus = async (status,booking_id,player_id , title) => {
    console.log("status + booking" , status, booking_id, player_id)

    const result = await apiRequest({
      method: "POST",
      url: ROUTES.UPDATE_BOOKING_HISTORY,
      data: { booking_id: booking_id, booking_status: status }
    }).catch((err) => {
      showFlash("Network Error", "danger", 'auto',)
     
      return false;
    });
    if (result.data.status) {
      showFlash(result.data.message, "success", 'auto')
      dispatch(getPendingBookingHistory(user?.id))
      if(player_id){
        const notificationResponse = await apiRequest({
            method: "post",
            url: ROUTES.SEND_USER_NOTIFICATION,
            data: {
                player_id :player_id,
                message : `Your booking for ${title} has been ${status} by ${user?.username}`
            }
        }).catch((err) => {
          
          console.log('====================================');
          console.log(err);
          console.log('====================================');
        });
        console.log('====================================');
        console.log(notificationResponse.data);
        console.log('====================================');
    }
    }
    else {
    }
   
  }

  return (

    <View style={{ flex: 1 }}>



      <FlatList
        showsVerticalScrollIndicator={false}
        data={allPendingOrders}
        contentContainerStyle={{flexGrow: 1,justifyContent: 'center', paddingBottom:10 }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Label style={styles.labelStyles}>No Pending Appointments</Label>}
        renderItem={({ item }) =>

          <AppointmentsItemRender
            name={item.username}
            phone={item.phone}
            title={item.service_title}
            description={item.service_description}
            time={item.service_time}
            start_time={item.start_time}
            end_time={item.end_time}
            price={item.service_price}
            booking_id = {item.booking_id}
            updateOrder = {updatePendingStatus}
            category = 'pending'
            player_id={item.player_id}
          />

        }


      />
    </View>
  )
}

const styles = StyleSheet.create({

 
  labelStyles: {
    paddingVertical: 8,
    marginLeft: width * 0.06,
    fontSize: FS_height(2.3),
    fontFamily: FONTS.WorkSans_SemiBold,
    color: COLORS.pure_Black,
    
  },
  

});