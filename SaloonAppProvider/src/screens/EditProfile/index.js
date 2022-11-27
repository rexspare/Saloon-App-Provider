import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CommonStyles from '../../assets/styles/CommonStyles';

import {
  height,
  width,
  COLORS,
  FS_height,
  FS_val,
  FONTS,
} from '../../utils/Common';
import { lang } from '../../assets/languages';
import {
  Layout,
  Heading,
  Text_type1,
  Label,
  CurveHeader,
} from '../../components';
import { Auth_Input } from '../../components/Input';
import { Auth_Button } from '../../components/Buttons';
import MyDateTimePicker from '../../components/MyDateTimePicker';
import moment from 'moment'
import { PERMISSIONS, checkMultiple, requestMultiple } from 'react-native-permissions';
// import { ROUTES } from "../../../remote/Routes";
import { BASE_URL, ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { showFlash } from '../../utils/MyUtils'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn, setUser } from '../../Data/Local/Store/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage_keys } from '../../utils/StorageKeys';
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = props => {
  const { navigation, route } = props;
  const user = useSelector((state) => state.authReducer.user)
  const [business, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [businessOpenTime, setBusinessOpenTime] = useState(null)
  const [businessCloseTime, setBusinessCloseTime] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [isOpenTimeModalVisible, setOpenTimeModalVisible] = useState(false);
  const [isCloseTimeModalVisible, setCloseTimeModalVisible] = useState(false);
  const [Coords, setCoords] = useState({})
  const [selectedItem, setSelectedItem] = useState([])
  const [secondarySelectedItem, setSecondarySelectedItem] = useState([])
  const [vendorCategories, setVendorCategories] = useState('')
  const [user_image, setuser_image] = useState(user?.user_image)
  const [imageObject, setimageObject] = useState({})
  const dispatch = useDispatch()

  const handlePickImage = () => {
    Alert.alert(
      'Change Image',
      "Select an Image from",
      [
        {
          text: "Cancel",
          onPress: () => { },
        },
        {
          text: "Camera",
          onPress: () => { openCamera() },
        },
        {
          text: "Gallery",
          onPress: () => { openGallery() },
        }
      ]
    );
  }

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimageObject(image)
    }).catch(() => {})
  }

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setimageObject(image)
    }).catch(() => {})
  }


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


  let avatar = user?.user_image ?
    user?.user_image?.includes('http') ?
      user?.user_image :
      BASE_URL + "uploads/" + user?.user_image
    :
    "https://www.w3schools.com/w3images/avatar2.png"

  const handlecontinue = async () => {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    let primaryCat = selectedItem.join();
    let secondaryCat = secondarySelectedItem.join()
    setisLoading(true)
    if (userName != '' && userEmail != '' && userPhone != '' && business != '' && businessWebsite != '' && businessOpenTime != null
      && businessCloseTime != null && Coords?.lat && primaryCat?.length > 0 && secondaryCat?.length > 0) {
        let form = new FormData()
        form.append('username', userName);
        form.append('email', userPhone);
        form.append('phone', userPhone);
        form.append('token', user?.token);
        form.append('user_id', user?.id);
        form.append('business_name', business);
        form.append('business_open_time', moment(businessOpenTime).format('H:mm'));
        form.append('business_close_time', moment(businessCloseTime).format('H:mm'));
        form.append('business_website', businessWebsite);
        form.append('business_lat', Coords.lat);
        form.append('business_long', Coords.long);
    
        if (imageObject?.path) {
            form.append('user_image',
                { uri: imageObject?.path, type: imageObject?.mime, mime: imageObject?.mime, name: 'profile.png' })
        }
        const result_ = await apiRequest({
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

       const result = await fetch(BASE_URL + ROUTES.UPDATE_PROFILE, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: form
        })
            .then((response) => response.json())
            .then((json) => {
              setisLoading(false)
                return json
            })
            .catch((error) => {
                console.error(error);
            });

            if (result?.status) {
              showFlash(result?.message, 'success', 'none')
              console.log('====================================');
              console.log(result.data);
              console.log('====================================');
              dispatch(setUser(result?.data))
              AsyncStorage.setItem(storage_keys.USER_DATA_KEY,
                  JSON.stringify(result?.data))
                  .then(() => { navigation.goBack() })
          } else {
              showFlash(result?.message, 'danger', 'none')
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

        <MyDateTimePicker
          isModalVisible={isOpenTimeModalVisible}
          modalCallback={() => setOpenTimeModalVisible(false)}
          onDateSelected={(date) => setBusinessOpenTime(date)}
        />


        <View style={{}}>
          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.topContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => handlePickImage()}>
              <Image source={{
                uri: imageObject?.path ?
                  imageObject?.path :
                  avatar
              }}
                style={styles.image} />
              <View style={styles.editIcon}>
                <MTCIcons name='pencil-outline' size={FS_val(14, 700)} color={COLORS.pure_White} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.HeaderContainer}>
            <Heading
              style={{
                fontSize: FS_val(22, 700),
                marginBottom: 7,
                letterSpacing: 0,
              }}>
              {'Edit Profile'}
            </Heading>

          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{'Name'}</Label>

              <Auth_Input placeholder={'Enter your name'} onChange={setUserName} />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{'Email'}</Label>

              <Auth_Input placeholder={'Enter your email'} onChange={setUserEmail} />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{'Phone'}</Label>

              <Auth_Input placeholder={'Enter your phone no.'} onChange={setUserPhone} numericKeyboard={true} />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._39}</Label>

              <Auth_Input placeholder={lang._40} onChange={setBusinessName} />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._41}</Label>

              <TouchableOpacity onPress={() => setOpenTimeModalVisible(true)}
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
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>{lang._42}</Label>

              <TouchableOpacity  onPress={() => setCloseTimeModalVisible(true)}
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
              </TouchableOpacity>
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

              <TouchableOpacity
                  onPress={() => navigation.navigate('EditLocation', { setCoords: setCoords })}
                style={[
                  styles.pickerContainer,
                  {
                    backgroundColor: COLORS.primary,
                    borderColor: props.isInvalid ? '#ff0000' : COLORS.subtle,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditLocation', { setCoords: setCoords })}
                  style={{ justifyContent: 'center' }}>
                  <Text_type1
                    style={{ alignSelf: 'center' }}

                    color={COLORS.subtle}>
                    {Coords?.address ? Coords?.address : `${lang._43}`}
                  </Text_type1>
                </TouchableOpacity>
              </TouchableOpacity>
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
              title={'Done'}
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
    marginBottom: 10,
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
  },
  topContainer: {
    width: width,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  imageContainer: {
    width: width * 0.38,
    height: width * 0.38,
    borderRadius: width * 0.2,
    borderColor: "#1e7bd6",
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: width * 0.36,
    maxWidth: 200,
    height: width * 0.36,
    maxHeight: 200,
    borderRadius: width * 0.2,
  },
  editIcon: {
    width: width * 0.07,
    maxWidth: 25,
    height: width * 0.07,
    maxHeight: 25,
    borderRadius: width * 0.05,
    backgroundColor: COLORS.Links,
    position: "absolute",
    bottom: '5%',
    right: '3%',
    borderWidth: 1.5,
    borderColor: COLORS.pure_White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileHeader: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    alignItems: 'center',
  },
});

export default EditProfile;
