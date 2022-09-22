import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { DiscoverItem, DiscoverItem_2, Heading, Label, Layout } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import { lang } from '../../assets/languages'
import Auth_Input from '../../components/Input/Auth_Input';
import WeekView from 'react-native-week-view';



const myEvents = [
  {
    id: 1,
    description: 'Event',
    startDate: new Date(2022, 9, 22, 12, 0),
    endDate: new Date(2022, 9, 22, 12, 30),
    color: 'blue',
    // ... more properties if needed,
  },
  // More events...
];

const Home = () => {
  const [editingEvent, setEditEvent] = useState(null);

  // const handlePressEvent = event => {
  //   if (editingEvent != null) {
  //     setEditEvent(null);
  //     return;
  //   }
  // }

  // const handlePressGrid = (event, startHour, date) => {
  //   if (editingEvent != null) {
  //     setEditEvent(null);
  //     return;
  //   }
  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
      <Layout fixed={false}>

        {/* HEADER SECTION */}
        <View style={styles.sectiionHeader}>
          <View style={styles._circle}></View>
          <Heading style={styles._heading} >Bookings</Heading>
          <Label style={styles._lable}>Your bookings today</Label>

        </View>
        {/* End */}

        <WeekView
          events={myEvents}
          selectedDate={new Date(2022, 9, 22)}
          numberOfDays={3}
          fixedHorizontally={true}
          headerStyle={styles.header}
          showNowLine
          hoursInDisplay={12}
          timeStep={60}
          startHour={15}
          gridColumnStyle={styles.gridColumn}
          gridRowStyle={styles.gridRow}
          eventContainerStyle={styles.eventContainer}
          hourTextStyle={styles.hourText}
          showTitle={!showFixedComponent}
          timesColumnWidth={0.2}
          onEventPress={handlePressEvent}
        
          headerTextStyle={styles.headerText}

        
        />

      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectiionHeader: {
    width: width,
    height: height * 0.27,
    paddingTop: 10,
    alignItems: "flex-start",
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
    backgroundColor: '#4286f4',
    borderColor: '#fff',
  },
  headerText: {
    color: 'white',
  },
  hourText: {
    color: 'black',
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
  gridRow: {
    borderTopWidth: 1.5,
    borderColor: 'red',
  },
  gridColumn: {
    borderLeftWidth: 1.5,
    borderColor: 'red',
  },

})


export default Home