import { View, SafeAreaView, StyleSheet} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Heading, Label, Layout } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import { lang } from '../../assets/languages'
import WeekView from 'react-native-week-view';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { showFlash } from '../../utils/MyUtils'
import moment from 'moment'

const myEvents = [
   
  {
    id: 2,
    description: 'Shinner',
    startDate: new Date('2022-10-22T06:39:26.112Z'),  
    endDate: new Date('2022-10-22T07:39:26.112Z'),
    color: COLORS.success,
    
  },
  {
    id: 3,
    description: 'Cutting',
    startDate: new Date(2022, 9, 22, 1, 40),
    endDate: new Date(2022, 9, 22, 2, 30),
    color: COLORS.success,
    
  }

];

const Home = () => {
 
  const user = useSelector((state) => state.authReducer.user)
  const [todaysBooking, setTodaysBooking] = useState([])
  const weekViewRef = useRef()
 



  useEffect(() => {
console.log(new Date('2022-09-22T13:39:26.112Z').toISOString(),"=-=-")
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
      showFlash("Todays booking's fetched", "success", 'auto')
   
     
    }
    else {
      console.log(result.data)
    }
  }

  const updatedObjectArray = todaysBooking.map((obj) => (
    {
      id: obj.id,
     description: obj.username,
     startDate: new Date(obj.start_time),
     endDate: new Date(obj.end_time),
     color: 'blue'
   }
 ))




  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      <Layout fixed={false}>

        {console.log("myEventsObj ==== ", JSON.stringify(myEvents) )}
        
        

        <View style={styles.sectiionHeader}>
          <Heading style={styles._heading} >Bookings</Heading>
          <Label style={styles._lable}>Your bookings today!</Label>

        </View>

        <View style={{flex:1, marginTop:-90}} >
        <WeekView
          events={myEvents}
          selectedDate={new Date(2022, 9, 22)}
          numberOfDays={1}
          fixedHorizontally={false}
          headerStyle={styles.header}
          locale='en'
          hoursInDisplay={12}
          timeStep={60}
          showNowLine

          gridColumnStyle={styles.gridColumn}
          gridRowStyle={styles.gridRow}
          eventContainerStyle={styles.eventContainer}
          onEventPress={(e)=> {
           console.log("CLICKEEEEEDDDD ")
          }}
          hourTextStyle={styles.hourText}
          timesColumnWidth={0.2}
          
        
          headerTextStyle={styles.headerText}

        
        />
        </View>
      </Layout>
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
    backgroundColor: COLORS.accent,
    width: width,
    height: width,
    borderRadius: width,
    bottom: width / 15,
    right: width / 3.3
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
    borderRadius: 20
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',

  },
  hourText: {
    color: COLORS.success,
    fontSize: 17,
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
   borderRadius: 7,
   justifyContent:'center',
   alignItems:'center',
   marginHorizontal: 2,
   
  },

})


export default Home