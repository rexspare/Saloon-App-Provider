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
import { setIsUserLoggedIn, setUser} from '../../Data/Local/Store/Actions';


const prefManager = new PrefManager()

const Splash = () => {
  const dispatch = useDispatch()
  const [isLoaded, setisLoaded] = useState(false)

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