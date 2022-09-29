import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { useSelector } from 'react-redux';
import { showFlash } from '../../utils/MyUtils'
import CommonStyles from '../../assets/styles/CommonStyles';
import { CurveHeader, Heading, Label, Text_type1, Layout } from '../../components';
import { height, width, COLORS, FS_height, FS_val, FONTS } from '../../utils/Common';
import { lang } from '../../assets/languages';
import { Auth_Input } from '../../components/Input';
import { Auth_Button } from '../../components/Buttons';
import MyDateTimePicker from '../../components/MyDateTimePicker';
import moment from 'moment'

export default function AddUserBookings(props) {

    const user = useSelector((state) => state.authReducer.user)
    const [vendorCategories, setVendorCategories] = useState('')
    const [businessOpenTime, setBusinessOpenTime] = useState(null)
    const [businessCloseTime, setBusinessCloseTime] = useState(null);
    const [isOpenTimeModalVisible, setOpenTimeModalVisible] = useState(false);
    const [isCloseTimeModalVisible, setCloseTimeModalVisible] = useState(false);
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

        data= {
            customer_id: user.id,
            vendor_id: user.id,
            service_id: selectedItem.join(),
            start_time: moment(businessOpenTime).format("YYYY:MM:DD HH:mm:ss"),
            end_time: moment(businessCloseTime).format("YYYY:MM:DD HH:mm:ss")

        }
        console.log("dsffgfgsafgasf========> ", JSON.stringify(data))

        // JSON.stringify(businessCloseTime.toISOString()).replace(/T/g, " ").replace(/.000Z/g, "")

        setisLoading(true)
        if (businessOpenTime != '' && businessCloseTime != '' && selectedItem.length == 1) {
            const result = await apiRequest({
                method: "post",
                url: ROUTES.ADD_VENDOR_SERVICE,
                data: {
                    customer_id: user.id,
                    vendor_id: user.id,
                    service_id: selectedItem.join(),
                    start_time: moment(businessOpenTime).format("YYYY:MM:DD HH:mm:ss"),
                    end_time: moment(businessCloseTime).format("YYYY:MM:DD HH:mm:ss")

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

                {isCloseTimeModalVisible && (
          <MyDateTimePicker
            modalCallback={() => setCloseTimeModalVisible(false)}
            onDateSelected={date => setBusinessCloseTime(date)}
            datetime = {true}
          />
        )}

        <MyDateTimePicker
          isModalVisible={isOpenTimeModalVisible}
          modalCallback={() => setOpenTimeModalVisible(false)}
          onDateSelected={(date) => setBusinessOpenTime(date)}
          datetime = {true}
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
                            Add Bookings
                        </Heading>

                        <Text_type1 style={{ textAlign: 'center', marginHorizontal: 20 }}>It's time to add bookings by your own!</Text_type1>
                    </View>
                    {/*  ==============   END   =================== */}

                    {/*  ==============   Section 2   =================== */}
                    <View style={styles.sectionContainer}>

                    <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>Start Time</Label>

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
                    {businessOpenTime ? moment(businessOpenTime).format('MMMM Do YYYY, h:mm:ss a') : lang._43}
                  </Text_type1>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Label style={styles.labelStyles}>End Time</Label>

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
                    {businessCloseTime ? moment(businessCloseTime).format('MMMM Do YYYY, h:mm:ss a') : lang._43}
                  </Text_type1>
                </TouchableOpacity>
              </View>
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