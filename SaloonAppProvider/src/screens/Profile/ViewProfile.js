import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import GoBackHeader from '../../components/GoBackHeader'
import { Heading, If, Label, Layout, MenuItem, Text_type1 } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, FS_val, height, width } from '../../utils/Common'
import { Text_Button } from '../../components/Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { lang } from '../../assets/languages'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL, ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storage_keys } from '../../utils/StorageKeys'
import { setIsUserLoggedIn, setUser } from '../../Data/Local/Store/Actions'


const ViewProfile = (props) => {
    const user = useSelector((state) => state.authReducer.user)
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.DELETE_USER_ACCOUNT,
            data: {
                user_id: user?.id,
                email: user?.email
            }
        }).catch((err) => {
            showFlash("Network Error", "danger", 'auto',)
            return false;
        });
        console.log(result.data);
        if (result.data.status) {
            showFlash("User and their data deleted successfully", "danger", 'auto',)
            AsyncStorage.removeItem(storage_keys.USER_DATA_KEY)
                .then(() => {
                    dispatch(setIsUserLoggedIn(false))
                    dispatch(setUser({}))
                    props.navigation.goBack()
                })
        }
        else {
            showFlash("Error deleting user, please try again", "danger", 'auto',)
        }
    }


    let avatar = user?.user_image ?
        user?.user_image?.includes('http') ?
            user?.user_image :
            BASE_URL + "uploads/" + user?.user_image
        :
        "https://www.w3schools.com/w3images/avatar2.png"


    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <GoBackHeader onpress={() => props.navigation.goBack()} />
            <Layout fixed={false}>
                {/* Image Container */}
                <View style={styles.topContainer}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Image source={{ uri: avatar }}
                            style={styles.image} />
                    </TouchableOpacity>
                </View>

                {/* Body */}
                <View style={{ backgroundColor: COLORS.primary, marginBottom: 30 }}>
                    <View style={styles.editProfileHeader}>
                        <Heading>{`My Profile`}</Heading>

                    </View>

                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>Full name</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user.username}</Label>
                    </View>
                    {/* <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._13}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>Farooq</Label>
                    </View> */}
                    {/* Phone number */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._17}</Label>
                        <If condition={true}>
                            <Label style={[styles.txtAlign, styles.value]}>{user.phone}</Label>
                        </If>
                        {/* <If condition={true}>
                            <Text_Button textStyles={[styles.btnTxt, { right: width * 0.35 }]}
                                title="+Add" />
                        </If> */}
                    </View>
                    {/* Email */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>Email</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user?.email}</Label>
                    </View>


                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._49}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user?.primary_category}</Label>
                    </View>


                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._50}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user?.secondary_category}</Label>
                    </View>

                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{'Opening time'}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user?.business_open_time}</Label>
                    </View>

                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{'Closing time'}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user?.business_close_time}</Label>
                    </View>

                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{'website'}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>{user?.business_website}</Label>
                    </View>
                </View>

                <View style={styles.sectionBreak}></View>

                {/* DELETE ACCOUNT */}
                <View style={{ backgroundColor: COLORS.primary, paddingTop: 10 }}>
                    <View style={[styles.editProfileHeader, { justifyContent: "flex-start" }]}>
                        <Heading>{lang._56}</Heading>
                    </View>

                    <Label style={[styles.value,
                    { marginVertical: FS_height(1), paddingHorizontal: '5%', textAlign: "left", fontSize: FS_height(2.4) }]}>
                        {lang._57}</Label>

                    <Text_Button style={styles.deleteBtn} textStyles={styles.deleteTxt}
                        title={lang._58}
                        onpress={() => {
                            Alert.alert(
                                "Dangerous action",
                                "This actions is irreversible",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => { },
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => { handleDelete() },
                                    },
                                ]
                            )
                        }}
                    />

                </View>



            </Layout>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    topContainer: {
        width: width,
        height: height * 0.3,
        ...commonStyles._center,
        marginTop: -12
    },
    imageContainer: {
        width: width * 0.38,
        height: width * 0.38,
        borderRadius: width * 0.2,
        borderColor: "#1e7bd6",
        ...commonStyles._center

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
        ...commonStyles._center
    },
    editProfileHeader: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    btnTxt: {
        color: COLORS.Links,
        fontSize: FS_height(2.6)
    },
    txtAlign: {
        textAlign: "left",
        paddingLeft: '5%'
    },
    value: {
        fontFamily: FONTS.WorkSans_Regular
    },
    sectionBreak: {
        height: FS_height(2),
        backgroundColor: "#f4f3f8",
        marginTop: FS_height(1.8)
    },
    deleteBtn: {
        alignSelf: "flex-start",
        paddingLeft: "5%",
        marginBottom: FS_height(3)
    },
    deleteTxt: {
        color: "#c43059",
        fontSize: FS_height(2.7)
    }
})

export default ViewProfile