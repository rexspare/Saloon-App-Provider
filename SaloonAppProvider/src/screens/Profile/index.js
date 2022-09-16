import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Auth_Button } from '../../components/Buttons'
import { useDispatch } from 'react-redux'
import { setIsUserLoggedIn } from '../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'
import CommonStyles from '../../assets/styles/CommonStyles'
import { Heading } from '../../components'
import { COLORS, FS_val, height, width, } from '../../utils/Common'
import { lang } from '../../assets/languages'
import Text_type1 from '../../components'
import FIcons from 'react-native-vector-icons/Feather'

export default function Profile() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    AsyncStorage.removeItem(storage_keys.USER_DATA_KEY)
      .then(() => {
        dispatch(setIsUserLoggedIn(false))
      })
  }


  return (
    <SafeAreaView style={CommonStyles.container} >
      
<View style={{flexDirection:'row'}}>
      <TouchableOpacity
              style={{
                overflow: 'hidden',
                height: 100,
                width: 100,
                borderRadius: 50,
                backgroundColor:'red'
              }}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}
                source = {require("../../assets/images/user.png")}
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: -30, padding: 5, justifyContent: "flex-end" }}
            >
              <View style={{ backgroundColor: 'white', borderRadius: 150 / 2, borderColor: '#ccc', borderWidth: .5 }}>
                <FIcons name="edit-2" style={styles.imageselector} size={15} color={COLORS.pure_Black} />
              </View>
            </TouchableOpacity>

            </View>

      <Auth_Button
        title={"logout"}
        onpress={() => handleLogout()}
      />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  HeaderContainer: {
    width: width,
    paddingHorizontal: '5%',
    paddingVertical: 25,
    ...CommonStyles._center,
  },
  imageselector: {
    padding: 10,
    elevation: 6
  },
})