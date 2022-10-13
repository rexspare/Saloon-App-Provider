import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, {useEffect} from 'react'
import { Auth_Button } from '../../components/Buttons'
import { setIsUserLoggedIn } from '../../Data/Local/Store/Actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'
import CommonStyles from '../../assets/styles/CommonStyles'
import { DiscoverItem, DiscoverItem_2, Heading, Label, Layout } from '../../components';
import MenuItem from '../../components/MenuItem'
import { COLORS, FS_val, height, width, FS_height, FONTS } from '../../utils/Common'
import { lang } from '../../assets/languages'
import { useDispatch, useSelector } from 'react-redux'
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import commonStyles from '../../assets/styles/CommonStyles'
import { Text_Button } from '../../components/Buttons'

import Ionicons from 'react-native-vector-icons/Ionicons'

const Menu = [
  {
    id: 1,
    title: "My bookings",
    Icon: <MTCIcons name='calendar-month-outline' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Appointment"
  },

  {
    id: 3,
    title: "Add Services",
    Icon: <Octicons name='diff-added' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "AddServices"
  },
  {
    id: 5,
    title: "Settings",
    Icon: <Ionicons name='md-settings-outline' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Setting"
  },
  {
    id: 6,
    title: "Edit Profile",
    Icon: <Feather name='edit' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "EditProfile"
  },
  {
    id: 7,
    title: "Log out",
    Icon: <Feather name='log-out' size={FS_height(3.5)} color={COLORS.secondary} />,
    route: "Logout"
  },
  
]


export default function ProfileMain(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user)

  const handleLogout = () => {
    AsyncStorage.removeItem(storage_keys.USER_DATA_KEY)
      .then(() => {
        dispatch(setIsUserLoggedIn(false))
       dispatch(setUser({})) 
      })
  }

  useEffect(() => {
    console.log(user.username);
    },[])



    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
        <Layout fixed={false}>
          {/* Header */}
          <View style={styles.topContainer}>
            {/* <View style={styles.imageContainer}>
              <Image source={{ uri: "https://picsum.photos/200/300" }}
                style={styles.image} />
            </View> */}
            <Heading style={{ fontSize: FS_height(3.5) }}>{user.username}</Heading>
            <Text_Button title={lang._51} textStyles={styles.viewProfile}
              onpress={() => props.navigation.navigate("ViewProfile")} />
          </View>
          {/* List Items */}
          {
            Menu.map((item) => (
              <MenuItem
                key={item.id}
                title={item.title}
                Icon={item.Icon}
                onpress={() => item.route == "Logout" ? handleLogout() : props.navigation.navigate(item.route)}
              />
            ))
          }
        </Layout>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: height * 0.20,
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingTop: "10%",
    paddingBottom: "8%"
  },
  imageContainer: {
    width: width * 0.37,
    height: width * 0.37,
    borderRadius: width * 0.2,
    borderWidth: 3,
    borderColor: COLORS.Links,
    ...commonStyles._center

  },
  image: {
    width: width * 0.37 - 10,
    maxWidth: 100,
    height: width * 0.37 - 10,
    maxHeight: 100,
    borderRadius: width * 0.1,
  },
  viewProfile: {
    color: COLORS.Links,
    fontSize: FS_height(2.4),
  }
})