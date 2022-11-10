import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Splash from './src/screens/Splash'
import { Provider } from 'react-redux';
import configureStore from "./src/Data/Local/Store/redux";
import FlashMessage from "react-native-flash-message";
import messaging from '@react-native-firebase/messaging'
import OneSignal from 'react-native-onesignal';

const store = configureStore()
const App = () => {

  // OneSignal Initialization
  OneSignal.setAppId("53437734-79b9-4cab-b779-e2e9b9abb66c");

  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification);
  });


  useEffect(() => {
    getPushToken(0)
  }, [])

  const getPushToken = async () => {
    const pushToken = (await OneSignal.getDeviceState()).pushToken
    const fcmToken = await messaging().getToken()
    const data = await OneSignal.getDeviceState();

    const player_id = data?.userId;
    console.log("PLAYER ID ===>>>", player_id);
    console.log("PUSH TOKEN ===>>>", pushToken);
    console.log("FCM TOKEN ===>>>", fcmToken);
  }

  return (
    <Provider store={store}>
      <Splash />
      <FlashMessage position="top" />
    </Provider>
  )
}

export default App