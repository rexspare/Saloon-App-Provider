import { StyleSheet, View,FlatList, ActivityIndicator , Text} from 'react-native'
import React, {useState, useEffect} from 'react'
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../utils/Common';
import AppointmentsItemRender from '../../components/AppointmentsItemRender';

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
          data: { user_id: user.id, type: 'vendor', booking_status:'pending'}
        }).catch((err) => {
          showFlash("Network Error", "danger", 'auto',)
          return false;
        });
        if (result.data.message) {
          
          showFlash("Pending Orders Fetched", "success", 'auto')
          setAllPendingOrders(result.data.data);
          console.log("PendingOrders ========> ", result.data.data)
         
         
        }
        else {
        }
      }

  return (
    
    <View style={{flex:1}}>
  
    

       <FlatList
        showsVerticalScrollIndicator={false}
        data={allPendingOrders}
        contentContainerStyle={{justifyContent: 'center', paddingBottom:10 }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<ActivityIndicator size="large" color={COLORS.pure_Black} style={{marginTop: 20}} />}
        renderItem={({ item }) => 

       <AppointmentsItemRender
       name = {item.username}
       phone = {item.phone}
       title = {item.service_title}
       description = {item.service_description}
       time = {item.service_time}
       start_time = {item.start_time}
       end_time = {item.end_time}
       price = {item.service_price}
       />

        } 
        
       
      />
    </View>
  )
}