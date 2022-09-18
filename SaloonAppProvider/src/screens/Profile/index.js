import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Auth_Button } from '../../components/Buttons'
import { useDispatch } from 'react-redux'
import { setIsUserLoggedIn } from '../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'
import CommonStyles from '../../assets/styles/CommonStyles'
import { DiscoverItem, DiscoverItem_2, Heading, Label, Layout } from '../../components';
import { COLORS, FS_val, height, width, FS_height, FONTS } from '../../utils/Common'
import { lang } from '../../assets/languages'

import FIcons from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Profile(props) {
  const dispatch = useDispatch()

  const handleLogout = () => {
    AsyncStorage.removeItem(storage_keys.USER_DATA_KEY)
      .then(() => {
        dispatch(setIsUserLoggedIn(false))
      })
  }


  return (
    <SafeAreaView style={CommonStyles.container} >


      <View style={{ flex: 1 }}>


        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
          <TouchableOpacity
          >
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,

                backgroundColor: 'rgba(0,0,0,0.8)',
              }}
              source={require("../../assets/images/user.png")}
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: -30, padding: 5, justifyContent: "flex-end" }}
          >
            <View style={{ backgroundColor: 'white', borderRadius: 150 / 2, borderColor: '#ccc', borderWidth: 2 }}>
              <FIcons name="upload" style={styles.imageselector} size={13} color={COLORS.pure_Black} />
            </View>
          </TouchableOpacity>

        </View>



        <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20, alignItems:'center' ,marginTop: 50, flexWrap: 'wrap'}}
        onPress={()=> props.navigation.navigate('AddServices') }>

            <Label style={styles._label}>Services</Label>
            <Ionicons name="ios-chevron-forward-outline" style={{ position: 'absolute', right: 0 }} size={20} color={COLORS.pure_Black} />
            
        </TouchableOpacity>

        <View style={{backgroundColor: 'rgba(0,0,0,0.1)', height: 2, marginHorizontal:20, marginVertical: 15}} />

        <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20, alignItems:'center' , flexWrap: 'wrap'}}>

            <Label style={styles._label}>Settings</Label>
            <Ionicons name="ios-chevron-forward-outline" style={{ position: 'absolute', right: 0 }} size={20} color={COLORS.pure_Black} />
            
        </TouchableOpacity>

        <View style={{backgroundColor: 'rgba(0,0,0,0.1)', height: 2, marginHorizontal:20, marginVertical: 15}} />

        <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20, alignItems:'center' , flexWrap: 'wrap'}}
        onPress={()=> handleLogout() }>

            <Label style={styles._label}>Logout</Label>
            <Ionicons name="ios-chevron-forward-outline" style={{ position: 'absolute', right: 0 }} size={20} color={COLORS.pure_Black} />
            
        </TouchableOpacity>
       

  

      </View>



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
    padding: 8,
    elevation: 6
  },
  sectionContainer: {


    ...CommonStyles._center,
  },
  _label: {
    fontFamily: FONTS.WorkSans_Medium,
    fontSize: FS_height(2.7),
   
  }
})