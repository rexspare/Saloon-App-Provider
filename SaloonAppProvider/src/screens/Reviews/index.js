import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../Data/remote/Routes';
import apiRequest from '../../Data/remote/Webhandler';

export default function Reviews() {

    const user = useSelector((state) => state.authReducer.user)

    useEffect(() => {

        getReviews();
    
      }, [])

      const getReviews = async ()=>{
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.REVIEWS,
            data: { vendor_id: user.id }

           
          }).catch((err) => {
            showFlash("Network Error", "danger", 'auto',)
            return false;
          });
          console.log(user )
          if (result.data.status) {
            console.log('====================================');
            console.log("REVIEWS : " , result.data);
            console.log('====================================');
            setVendorCategories(result.data)
            console.log("DATA FETCHED ====>  ", result.data)
          }
          else {
            console.log("'''''''''");
          }
      }

  return (
    <View>
      <Text>Reviews</Text>
    </View>
  )
}

const styles = StyleSheet.create({})