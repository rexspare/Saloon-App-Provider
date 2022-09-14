import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Auth_Button } from '../../components/Buttons'
import { useDispatch } from 'react-redux'
import { setIsUserLoggedIn } from '../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'

export default function Profile() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    AsyncStorage.removeItem(storage_keys.USER_DATA_KEY)
      .then(() => {
        dispatch(setIsUserLoggedIn(false))
      })
  }

  return (
    <View>
      <Auth_Button
        title={"logout"}
        onpress={() => handleLogout()}
      />
    </View>
  )
}

const styles = StyleSheet.create({})