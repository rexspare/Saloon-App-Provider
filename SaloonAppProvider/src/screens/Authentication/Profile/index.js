import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonStyles from '../../../assets/styles/CommonStyles';
import {
  height,
  width,
  COLORS,
  FS_height,
  FS_val,
  FONTS,
} from '../../../utils/Common';
import {lang} from '../../../assets/languages';
import {
  Layout,
  Heading,
  Text_type1,
  Label,
  CurveHeader,
} from '../../../components';
import {Auth_Input} from '../../../components/Input';
import {Auth_Button} from '../../../components/Buttons';
import MyDateTimePicker from '../../../components/MyDateTimePicker';
import moment from 'moment'
import { PERMISSIONS, checkMultiple, requestMultiple } from 'react-native-permissions';

const Profile = props => {
  const {navigation, route} = props;

  const [business, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [businessOpenTime, setBusinessOpenTime] =  useState(null)
  const [businessCloseTime, setBusinessCloseTime] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isOpenTimeModalVisible, setOpenTimeModalVisible] = useState(false);
  const [isCloseTimeModalVisible, setCloseTimeModalVisible] = useState(false);


  useEffect(() => {
    setLocationPermission()
  }, [])

  const setLocationPermission = ()=> {
    let mediaPer =
        Platform.OS == 'android'
            ? [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
            : Platform.OS == 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY] : null;

    checkMultiple(mediaPer)
        .then(statuses => {
            if (statuses[mediaPer] == 'granted') {
              console.log('Granted')
                
            } else {

                requestMultiple(mediaPer).then(statuses => {
                    if (statuses[mediaPer] == 'granted') {
                        console.log('---------------> Permissions Granted')
                    } else {
                        console.log('---------------> Rejected');
                    }


                });
            }
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        });
}

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Layout fixed={false}>
        <CurveHeader />

        {isCloseTimeModalVisible && (
          <MyDateTimePicker
            modalCallback={() => setCloseTimeModalVisible(false)}
            onDateSelected={date => setBusinessCloseTime(date)}
          />
        )}

    



          <MyDateTimePicker
          isModalVisible = {isOpenTimeModalVisible}
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

            <Text_type1 style={{textAlign: 'left'}}>{`${lang._38}`}</Text_type1>
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
                <TouchableOpacity  onPress={() => setOpenTimeModalVisible(true)} style={{justifyContent: 'center'} }>
                <Text_type1
                    style={{alignSelf: 'center'}}
                    bold={true}
                    color={COLORS.pure_Black}>
                    {businessOpenTime ? moment(businessOpenTime).format('H:mm A') : lang._43}
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
                  style={{justifyContent: 'center'}}>
                  <Text_type1
                    style={{alignSelf: 'center'}}
                    bold={true}
                    color={COLORS.pure_Black}>
                    {businessCloseTime ? moment(businessCloseTime).format('H:mm A') : lang._43}
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
                  onPress={() => navigation.navigate('Location')}
                  style={{justifyContent: 'center'}}>
                  <Text_type1
                    style={{alignSelf: 'center'}}
                    bold={true}
                    color={COLORS.pure_Black}>
                    {`${lang._43}`}
                  </Text_type1>
                </TouchableOpacity>
              </View>
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
    </SafeAreaView>
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
});

export default Profile;
