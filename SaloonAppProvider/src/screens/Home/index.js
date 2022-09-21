import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { DiscoverItem, DiscoverItem_2, Heading, Label, Layout } from '../../components';
import commonStyles from '../../assets/styles/CommonStyles';
import { COLORS, FONTS, FS_height, height, width } from '../../utils/Common';
import { lang } from '../../assets/languages'
import Auth_Input from '../../components/Input/Auth_Input';
import WeekView from 'react-native-week-view';


const Data = [
  { _id: 1, name: "Beauty Salon", image: "https://picsum.photos/200/300" },
  { _id: 2, name: "Hair Salon", image: "https://picsum.photos/200/300" },
  { _id: 3, name: "Babarshop", image: "https://picsum.photos/200/300" },
  { _id: 4, name: "Tattoo & Peircing", image: "https://picsum.photos/200/300" },
]

const myEvents = [
  {
    id: 1,
    description: 'Massage Booking',
    startDate: new Date(2021, 3, 15, 1, 0),
    endDate: new Date(2021, 3, 15, 1, 30),
    color: 'lightblue',
    style: { }
    // ... more properties if needed,
  },
  // More events...
];

const Home = () => {
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
          selectedDate={new Date(2021, 3, 15)}
          numberOfDays={1}
          fixedHorizontally={true}
   
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

})


export default Home