import React, { useEffect, useState } from 'react'
import AnimatedSplash from "react-native-animated-splash-screen";
import PrefManager from '../../Data/Local/PrefManager';
import { useSelector, useDispatch } from 'react-redux';
import RootStack from '../../navigation/RootStack';
import Branding from '../../components/Branding';
import AuthStack from '../../navigation/AuthStack';
import { View } from 'react-native';
import { COLORS } from '../../utils/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage_keys } from '../../utils/StorageKeys';
import { getPendingBookingHistory, setIsUserLoggedIn, setUser} from '../../Data/Local/Store/Actions';
import OneSignal from 'react-native-onesignal';

const prefManager = new PrefManager()

const Splash = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user)
  const [isLoaded, setisLoaded] = useState(false)

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      if(user?.id){
        dispatch(getPendingBookingHistory(user?.id))
      }
      const data = notification.additionalData
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });
  
    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });

  useEffect(() => {
    AsyncStorage.getItem(storage_keys.USER_DATA_KEY)
    .then((data) => {
      if (data) {
        dispatch(setUser(JSON.parse(data)));
        dispatch(setIsUserLoggedIn(true))
      } else {
        dispatch(setIsUserLoggedIn(false))
      }
    })
  setTimeout(() => {
    setisLoaded(true)
  }, 2000);
  }, [])

  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={isLoaded}
      customComponent={<Branding />}
      backgroundColor={COLORS.primary}

    >
      <RootStack />
    </AnimatedSplash>
  )
}

export default Splash