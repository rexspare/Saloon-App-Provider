import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CommonStyles from '../../../assets/styles/CommonStyles';
import {
  height,
  width,
  COLORS,
  FS_height,
  FS_val,
  FONTS,
} from '../../../utils/Common';
import { lang } from '../../../assets/languages';
import {
  Layout,
  Heading,
  Text_type1,
  Label,
  CurveHeader,
} from '../../../components';
import { Auth_Input } from '../../../components/Input';
import { Auth_Button } from '../../../components/Buttons';
import MyDateTimePicker from '../../../components/MyDateTimePicker';
import moment from 'moment'
import { PERMISSIONS, checkMultiple, requestMultiple } from 'react-native-permissions';
// import { ROUTES } from "../../../remote/Routes";
import { ROUTES } from '../../../Data/remote/Routes'
import apiRequest from '../../../Data/remote/Webhandler'
import { showFlash } from '../../../utils/MyUtils'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn } from '../../../Data/Local/Store/Actions';

const Profile = props => {
  const { navigation, route } = props;
  const user = useSelector((state) => state.authReducer.user)
  const [business, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [businessOpenTime, setBusinessOpenTime] = useState(null)
  const [businessCloseTime, setBusinessCloseTime] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [vendorCategories, setVendorCategories] = useState('')
  const [isOpenTimeModalVisible, setOpenTimeModalVisible] = useState(false);
  const [isCloseTimeModalVisible, setCloseTimeModalVisible] = useState(false);
  const [currentVendorLocation, setCurrentVendorLocation] = useState('')
  const [selectedItem, setSelectedItem] = useState([])
  const [secondarySelectedItem, setSecondarySelectedItem] = useState([])
  const [Coords, setCoords] = useState({})

const dispatch = useDispatch()

  useEffect(() => {
    setLocationPermission()
    getCat();

  }, [])

  const getCat = async () => {


    const result = await apiRequest({
      method: "GET",
      url: ROUTES.GET_CATEGORIES,
    }).catch((err) => {
      showFlash("Network Error", "danger", 'auto',)
      return false;
    });
    if (result.data.status) {
      setVendorCategories(result.data)
    }
    else {
    }
  }

  const handleOnPress = (item, checkClickedCategory) => {

    var itemSelected = checkClickedCategory == 'Primary' ? selectedItem : secondarySelectedItem
    var setItemSelected = checkClickedCategory == 'Primary' ? setSelectedItem : setSecondarySelectedItem

    if (itemSelected.includes(item.category_name)) {
      const newList = itemSelected.filter(catName => catName !== item.category_name)
      return setItemSelected(newList)
    }
    setItemSelected([...itemSelected, item.category_name])
  }

  const getSelectedItem = (item, checkClickedCategory) => {

    var itemSelected = checkClickedCategory == 'Primary' ? selectedItem : secondarySelectedItem
    return itemSelected.includes(item.category_name)

  }

  const handlecontinue = async () => {
    let primaryCat = selectedItem.join();
    let secondaryCat = secondarySelectedItem.join()
    setisLoading(true)
    if (business != '' && businessWebsite != '' && businessOpenTime != null
      && businessCloseTime != null && selectedItem.length != 0 && Coords?.lat) {
      const result = await apiRequest({
        method: "post",
        url: ROUTES.CREATE_VENDOR_PROFILE,

        data: {
          business_name: business,
          business_open_time: moment(businessOpenTime).format('H:mm'),
          business_close_time: moment(businessCloseTime).format('H:mm'),
          business_website: businessWebsite,

          business_lat: Coords.lat,
          business_long: Coords.long,
          primary_category: primaryCat,
          secondary_category: secondaryCat,
          user_id: user.id
        }

      }).catch((err) => {
        showFlash("Somehomg Went Wrong", "danger", 'auto')
        setisLoading(false)
      });
      if (result?.data?.status) {
        showFlash(result.data.message, 'success', 'none')
        dispatch(setIsUserLoggedIn(true))
      } else {
        showFlash(result.data.message, 'danger', 'none')

      }
    } else {
      showFlash("Please enter all required data", "warning", "auto")
    }
    setisLoading(false)

  }

  const setLocationPermission = () => {
    let mediaPer =
      Platform.OS == 'android'
        ? [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
        : Platform.OS == 'ios' ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] : null;

    checkMultiple(mediaPer)
      .then(statuses => {
        if (statuses[mediaPer] == 'granted') {
          console.log('Granted')

        } else {

          requestMultiple(mediaPer).then(statuses => {
            if (statuses[mediaPer] == 'granted') {

            } else {

            }

          });
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }

  return (
    <View style={CommonStyles.container}>
      <Layout fixed={false}>
        <CurveHeader />

        {isCloseTimeModalVisible && (
          <MyDateTimePicker
            modalCallback={() => setCloseTimeModalVisible(false)}
            onDateSelected={date => setBusinessCloseTime(date)}
          />
        )}

        <MyDateTimePickers
          isModalVisible={isOpenTimeModalVisible}
          modalCallback={() => setOpenTimeModalVisible(false)}
          onDateSelected={(date) => setBusinessOpenTime(date)}
        />


        <View style={{}}>
          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading
              style={{
                fontSize: FS_val(22, 700),
                marginBottom: 7,
                letterSpacing: 0,
              }}>
              {'' + lang._37}
            </Heading>

            <Text_type1 style={{ textAlign: 'left' }}>{`${lang._38}`}</Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>
            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._39}</Label>

              <Auth_Input placeholder={lang._40} onChange={setBusinessName} />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._41}</Label>

              <View
                style={[
                  styles.pickerContainer,
                  {
                    backgroundColor: COLORS.primary,
                    borderColor: props.isInvalid ? '#ff0000' : COLORS.subtle,
                  },
                ]}>
                <TouchableOpacity onPress={() => setOpenTimeModalVisible(true)} style={{ justifyContent: 'center' }}>
                  <Text_type1
                    style={{ alignSelf: 'center' }}

                    color={COLORS.subtle}>
                    {businessOpenTime ? moment(businessOpenTime).format('H:mm') : lang._43}
                  </Text_type1>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._42}</Label>

              <View
                style={[
                  styles.pickerContainer,
                  {
                    backgroundColor: COLORS.primary,
                    borderColor: props.isInvalid ? '#ff0000' : COLORS.subtle,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => setCloseTimeModalVisible(true)}
                  style={{ justifyContent: 'center' }}>
                  <Text_type1
                    style={{ alignSelf: 'center' }}

                    color={COLORS.subtle}>
                    {businessCloseTime ? moment(businessCloseTime).format('H:mm') : lang._43}
                  </Text_type1>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._44}</Label>

              <Auth_Input
                placeholder={lang._45}
                onChange={setBusinessWebsite}
              />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._46}</Label>

              <View
                style={[
                  styles.pickerContainer,
                  {
                    backgroundColor: COLORS.primary,
                    borderColor: props.isInvalid ? '#ff0000' : COLORS.subtle,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Location', { setCoords: setCoords })}
                  style={{ justifyContent: 'center' }}>
                  <Text_type1
                    style={{ alignSelf: 'center' }}

                    color={COLORS.subtle}>
                    {Coords?.address ? Coords?.address : `${lang._43}`}
                  </Text_type1>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._49}</Label>
              <ScrollView style={{ marginHorizontal: 20 }} horizontal={true} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }} >
                  {
                    vendorCategories?.categories?.map((categories, index) => {
                      return (
                        <TouchableOpacity style={[styles.catBg, { backgroundColor: getSelectedItem(categories, 'Primary') ? '#679f58' : COLORS.pure_Black }]}
                          key={index}
                          onPress={() => handleOnPress(categories, 'Primary')} >

                          <Text_type1
                            style={{ alignSelf: 'center', fontSize: 14 }}
                            color={COLORS.pure_White}>
                            {categories?.category_name}
                          </Text_type1>


                        </TouchableOpacity>


                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._50}</Label>

              <ScrollView style={{ marginHorizontal: 20 }} horizontal={true} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }} >
                  {
                    vendorCategories?.categories?.map((categories, index) => {
                      return (
                        <TouchableOpacity style={[styles.catBg, { backgroundColor: getSelectedItem(categories, 'Secondary') ? '#679f58' : COLORS.pure_Black }]}
                          key={index}
                          onPress={() => handleOnPress(categories, 'Secondary')} >

                          <Text_type1
                            style={{ alignSelf: 'center', fontSize: 14 }}
                            color={COLORS.pure_White}>
                            {categories?.category_name}
                          </Text_type1>


                        </TouchableOpacity>


                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>

          </View>

          {/*  ==============   END   =================== */}

          <View style={styles.sectionContainer}>
            <Auth_Button
              title={lang._47}
              onpress={() => handlecontinue()}
              isLoading={isLoading}
            />
          </View>
        </View>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    width: width,
    paddingHorizontal: '5%',
    paddingVertical: 25,
    ...CommonStyles._center,
  },

  sectionContainer: {
    // paddingHorizontal: '5%',
    marginBottom: 15,
    ...CommonStyles._center,
  },
  inputContainer: {
    width: width,
    // borderWidth:2,
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  labelStyles: {
    paddingVertical: 8,
    marginLeft: width * 0.06,
    fontSize: FS_height(2.3),
    fontFamily: FONTS.WorkSans_SemiBold,
  },
  agreementContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  LabelAgree: {
    fontSize: FS_height(2),
    fontFamily: FONTS.Merriweather_Regular,
    textAlign: 'left',
    width: '70%',
  },

  agreebtn: {
    color: COLORS.Links,
    fontSize: FS_height(2),
    fontFamily: FONTS.Merriweather_Regular,
  },
  pickerContainer: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 5,
    ...CommonStyles._border,
    elevation: 3,
    width: '88%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  catBg: {
    width: 155,
    height: 48,
    borderRadius: 30,
    marginEnd: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Profile;
