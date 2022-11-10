import { View, SafeAreaView, StyleSheet, ScrollView, Modal, TouchableOpacity, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CurveHeader, Heading, Label, Layout, Text_type1 } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import WeekView from 'react-native-week-view';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { showFlash } from '../../utils/MyUtils'
import Ionicons from 'react-native-vector-icons/Ionicons'



const Home = (props) => {

  const user = useSelector((state) => state.authReducer.user)
  const [todaysBooking, setTodaysBooking] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [customerDetails, setCustomerDetails] = useState('')


  useEffect(() => {
    getTodaysBooking();
  }, [])

  const getTodaysBooking = async () => {

    const result = await apiRequest({
      method: "POST",
      url: ROUTES.TODAYS_BOOKINGS,
      data: { user_id: user.id }
    }).catch((err) => {
      showFlash("Network Error", "danger", 'auto',)
      return false;
    });
    if (result.data.status) {
      setTodaysBooking(result.data.data)
      // showFlash("Todays booking's fetched", "success", 'auto')
      console.log("D--------> ", result.data)
    }
    else {
      console.log(result.data)
    }
  }

  const updatedObjectArray = todaysBooking.map((obj) => (
    {
      id: obj.booking_id,
      name: obj.username,
      startDate: new Date(obj.isoStartTime),
      endDate: new Date(obj.isoEndTime),
      color: COLORS.success,
      phone: obj.phone,
      title: obj.service_title,
      price: obj.service_price,


    }
  ))

  const toggleModal = (visible) => {
    setModalVisible(visible)
  }

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>


      <View style={styles.sectiionHeader}>
        <Heading style={styles._heading} >Bookings</Heading>
        <Label style={styles._lable}>Your bookings today!</Label>

      </View>


      <Modal
        transparent={true}
        animationType={'fade'}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={150}
        animationOutTiming={150}
        hasBackdrop={false}
        hideModalContentWhileAnimating={true}
        backdropColor={'transparent'}
        visible={modalVisible}
      >

        <View style={styles.container}>

          <View style={styles.View}>


            <View >


              <Text_type1
                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Bold, fontSize: 18 }}
                color={COLORS.subtle}>
                {'Name: '}
              </Text_type1>

              <Text_type1
                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_SemiBold, fontSize: 19, color: COLORS.success }}

                color={COLORS.pure_Black}>
                {customerDetails.name}`
              </Text_type1>

              <Text_type1
                style={{ textAlign: "left", textAlign: "left", fontFamily: FONTS.WorkSans_ExtraBold, fontSize: 19 }}
                color={COLORS.subtle}>
                {'Phone: '}
              </Text_type1>

              <Text_type1
                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_SemiBold, fontSize: 18, color: COLORS.success }}

                color={COLORS.pure_Black}>
                {`${customerDetails.phone}`}
              </Text_type1>


              <Text_type1
                style={{ textAlign: "left", textAlign: "left", fontFamily: FONTS.WorkSans_ExtraBold, fontSize: 19 }}
                color={COLORS.subtle}>
                {'Title: '}
              </Text_type1>

              <Text_type1
                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_SemiBold, fontSize: 18, color: COLORS.success }}

                color={COLORS.pure_Black}>
                {`${customerDetails.title}`}
              </Text_type1>

              <Text_type1
                style={{ textAlign: "left", textAlign: "left", fontFamily: FONTS.WorkSans_ExtraBold, fontSize: 19 }}
                color={COLORS.subtle}>
                {'Price: '}
              </Text_type1>

              <Text_type1
                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_SemiBold, fontSize: 18, color: COLORS.success }}

                color={COLORS.pure_Black}>
                {`${customerDetails.price}`}
              </Text_type1>

            </View>

            <TouchableOpacity onPress={() =>
              toggleModal(!modalVisible)
            }>
              <Ionicons name="close-circle" style={{ alignSelf: 'center' }} size={50} color='red' />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>


      <ScrollView style={{ flex: 1, marginTop: -90 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}>
        <View >

          <WeekView
            events={updatedObjectArray}
            selectedDate={new Date()}
            numberOfDays={1}
            fixedHorizontally={false}
            headerStyle={styles.header}
            locale='en'
            hoursInDisplay={12}
            timeStep={60}
            showNowLine
            nowLineColor='red'
            gridColumnStyle={styles.gridColumn}
            gridRowStyle={styles.gridRow}
            eventContainerStyle={styles.eventContainer}
            onEventPress={(e) => { toggleModal(!modalVisible), setCustomerDetails(e) }}
            hourTextStyle={styles.hourText}
            timesColumnWidth={0.2}
            headerTextStyle={styles.headerText}


          />
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 20, end: 20 }}>
        <TouchableOpacity
        onPress={()=>  props.navigation.navigate("AddUserBookings")}
          style={styles.add_appointment}
       
        >
          <Ionicons name='add-outline' color={COLORS.pure_White} size={30} />

        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectiionHeader: {
    width: width,
    height: height * 0.27,
    paddingTop: 10,
    alignItems: "flex-start"
  },
  _circle: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 163, 110, 0.1)',
    width: width,
    height: width,
    borderRadius: width,
    bottom: width / 15,
    right: width / 3.3,
    overflow: 'hidden'
  },
  _heading: {
    fontSize: FS_height(4.5),
    fontFamily: FONTS.WorkSans_Bold,
    marginLeft: '6%',
    marginTop: height * 0.02
  },
  _lable: {
    fontFamily: FONTS.WorkSans_Regular,
    marginLeft: '6%'
  },
  _input: {
    marginTop: 15
  },
  _header: {
    alignSelf: "flex-start",
    paddingLeft: '5%',
    fontSize: FS_height(3),
    marginVertical: FS_height(0.5)
  },
  header: {
    backgroundColor: COLORS.pure_Black,
    borderColor: '#fff',
    height: 75,
    borderRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',

  },
  hourText: {
    color: COLORS.success,
    fontSize: 18,
    fontFamily: FONTS.WorkSans_SemiBold
  },

  gridRow: {
    borderTopWidth: 1,
    borderColor: COLORS.subtle,
  },
  gridColumn: {
    borderLeftWidth: 1,
    borderColor: COLORS.subtle,
  },
  eventContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderColor: COLORS.pure_White,
    borderWidth: 0.5,
    maxWidth: 40
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',

  },
  View: {
    backgroundColor: COLORS.pure_White,
    width: '75%',
    height: '45%',
    borderRadius: 45,
    padding: 17,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  add_appointment:{
  
      width: 60,
      height: 60,
      borderRadius: 35,
      backgroundColor: COLORS.success,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center'
  
  }

})


export default Home