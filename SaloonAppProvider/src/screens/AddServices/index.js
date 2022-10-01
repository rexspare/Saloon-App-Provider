import { StyleSheet,  View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'
import CommonStyles from '../../assets/styles/CommonStyles';
import { CurveHeader, Heading, Label, Text_type1, Layout } from '../../components';
import RadioBox from '../../components/RadioBox'
import { width, COLORS, FS_height, FS_val, FONTS } from '../../utils/Common';
import { Auth_Input } from '../../components/Input';
import { Auth_Button } from '../../components/Buttons';

export default function AddServices(props) {

  const user = useSelector((state) => state.authReducer.user)
  const [vendorCategories, setVendorCategories] = useState('')
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceDescription, setServiceDescription] = useState('')
  const [gender, setGender] = useState('')
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [servicePrice, setServicePrice] = useState('')
  const [serviceDuration, setServiceDuration] = useState('')
  const [selectedItem, setSelectedItem] = useState([])
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {

    getCat();

  }, [])


  const getCat = async () => {


    const result = await apiRequest({
      method: "POST",
      url: ROUTES.GET_VENDOR_SELECTED_CATEGORIES,
      data: { user_id: user.id }
    }).catch((err) => {
      showFlash("Network Error", "danger", 'auto',)
      return false;
    });
    if (result.data.status) {
      setVendorCategories(result.data)
      console.log("DATA FETCHED ====>  ", result.data)
    }
    else {
    }
  }

  const getSelectedItem = (item) => selectedItem.includes(item.category_id)

  const handleOnPress = (item) => {



    if (selectedItem.length < 1) {
      setSelectedItem([item.category_id])
      return
    }

    if (selectedItem.length == 1) {
      if (selectedItem.includes(item.category_id)) {
        const newList = selectedItem.filter(catId => catId !== item.category_id)
        setSelectedItem(newList)
      }
      else showFlash("Already selected.", 'danger', 'none')
      return
    }

  }

  const handlecontinue = async () => {
    
    setisLoading(true)
    if (serviceTitle != '' && serviceDescription != '' && gender !='' &&
      servicePrice != '' && serviceDuration != '' && selectedItem.length == 1) {
      const result = await apiRequest({
        method: "post",
        url: ROUTES.ADD_VENDOR_SERVICE,

        data: {
          user_id: user.id,
          service_title: serviceTitle,
          service_description: serviceDescription,
          service_for: gender,
          service_price: servicePrice,
          category_id: selectedItem.join(),
          service_time: serviceDuration,

        }

      }).catch((err) => {
        showFlash("Somehomg Went Wrong", "danger", 'auto')
        setisLoading(false)
      });
      if (result?.data?.status) {
        showFlash(result.data.message, 'success', 'none')
        props.navigation.goBack()
      } else {
        showFlash(result.data.message, 'danger', 'none')

      }
    } else {
      showFlash("Please enter all required data", "warning", "auto")
    }
    setisLoading(false)

  }



  return (
    <SafeAreaView style={CommonStyles.container}>
      <Layout fixed={false}>
        <CurveHeader />




        <View style={{}}>
          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading
              style={{
                fontSize: FS_val(22, 700),
                marginBottom: 7,
                letterSpacing: 0,
              }}>
              Add Services
            </Heading>

            <Text_type1 style={{ textAlign: 'center', marginHorizontal: 20 }}>It's time to add services and let's grow your business!</Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Service title</Label>

              <Auth_Input placeholder={'Enter service title'} onChange={setServiceTitle} />
            </View>



            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Service description</Label>

              <Auth_Input
                placeholder={'Enter service description'}
                onChange={setServiceDescription}
              />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Select gender</Label>
              <View style={{ alignSelf: 'center', marginHorizontal: 12 }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <RadioBox
                  
                    onPress={() => {setMale(true), setFemale(false), setGender('Male')}}
                    title={'Male'}
                    isChecked={male}

                  />

                  <RadioBox
                    onPress={() => {setFemale(true), setMale(false), setGender('Female')}}
                    title={'Female'}
                    isChecked={female}

                  />
                </View>


              </View>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Enter price</Label>

              <Auth_Input
                placeholder={'Enter service price'}
                numericKeyboard={true}
                onChange={setServicePrice}
              />
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Enter duration</Label>

              <Auth_Input
                placeholder={'Enter service duration i.e H:MM'}
                numericKeyboard={true}
                onChange={setServiceDuration}
              />
            </View>



            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Service category:</Label>
              <ScrollView style={{ marginHorizontal: 20 }} horizontal={true} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }} >
                  {
                    vendorCategories?.data?.map((categories, index) => {
                      return (
                        <TouchableOpacity style={[styles.catBg, { backgroundColor: getSelectedItem(categories, 'Primary') ? '#679f58' : COLORS.pure_Black }]}
                          key={index}
                          onPress={() => handleOnPress(categories)} >

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