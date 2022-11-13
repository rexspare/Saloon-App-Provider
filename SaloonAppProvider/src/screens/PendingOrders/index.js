import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'
import { useFocusEffect } from '@react-navigation/native';
import AppointmentsItemRender from '../../components/AppointmentsItemRender';
import { Label } from '../../components';
import { width, FS_height, FONTS, COLORS } from '../../utils/Common';



export default function PendingOrders() {

  const user = useSelector((state) => state.authReducer.user)
  const [allPendingOrders, setAllPendingOrders] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      console.log("HEREs");
      getPendingBookingHistory()
    }, [])
  );


  const getPendingBookingHistory = async () => {


    const result = await apiRequest({
      method: "POST",
      url: ROUTES.GET_BOOKING_HISTORY,
      data: { user_id: user.id, type: 'vendor', booking_status: 'pending' }
    }).catch((err) => {
      showFlash("Network Error", "danger", 'auto',)
      return false;
    });
    if (result.data.message) {

     
      setAllPendingOrders(result.data.data);
      console.log("PendingOrders ========> ", result.data.data)


    }
    else {
    }
  }

  const updatePendingStatus = async (status,booking_id ) => {
    console.log("status + booking" , status, booking_id)

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
      getPendingBookingHistory();
    
     

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