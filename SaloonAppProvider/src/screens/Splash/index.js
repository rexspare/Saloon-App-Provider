import React, { useEffect, useState } from 'react'
import AnimatedSplash from "react-native-animated-splash-screen";
import PrefManager from '../../Data/Local/PrefManager';
import { useSelector, useDispatch } from 'react-redux';
import RootStack from '../../navigation/RootStack';
import Branding from '../../components/Branding';
import AuthStack from '../../navigation/AuthStack';
import { View } from 'react-native';
import { COLORS } from '../../utils/Common';

const prefManager = new PrefManager()

const Splash = () => {
  const dispatch = useDispatch()
  const [isLoaded, setisLoaded] = useState(false)

  useEffect(() => {

    setisLoaded(true)
  }, [])

  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={isLoaded}
      customComponent={<Branding />}
      backgroundColor={COLORS.primary}

    >
      {/* <RootStack /> */}
      <AuthStack/>
    </AnimatedSplash>
  )
}

export default Splash