import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import GoBackHeader from '../../components/GoBackHeader'
import {  Heading, If, Label, Layout, MenuItem, Text_type1 } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, FS_val, height, width } from '../../utils/Common'
import { Text_Button } from '../../components/Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { lang } from '../../assets/languages'   



const ViewProfile = (props) => {
    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <GoBackHeader onpress={() => props.navigation.goBack()} />
            <Layout fixed={false}>
                {/* Image Container */}
                {/* <View style={styles.topContainer}>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Image source={{ uri: "https://picsum.photos/200/300" }}
                            style={styles.image} />
                        <View style={styles.editIcon}>
                            <MTCIcons name='pencil-outline' size={FS_val(14, 700)} color={COLORS.pure_White} />
                        </View>
                    </TouchableOpacity>
                </View> */}

                {/* Body */}
                <View style={{ backgroundColor: COLORS.primary }}>
                    <View style={styles.editProfileHeader}>
                        <Heading>{`My Profile`}</Heading>
                       
                    </View>

                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._11}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>Moeed</Label>
                    </View>
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._13}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>Farooq</Label>
                    </View>
                    {/* Phone number */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._17}</Label>
                        <If condition={false}>
                            <Label style={[styles.txtAlign, styles.value]}>Moeed</Label>
                        </If>
                        <If condition={true}>
                            <Text_Button textStyles={[styles.btnTxt, { right: width * 0.35 }]}
                                title="+Add" />
                        </If>
                    </View>
                    {/* Email */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._51}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>Moeedfarooq66@gmail.com</Label>
                    </View>

                    {/* DOB */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._49}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>10 Oct 1997</Label>
                    </View>

                    {/* Gender */}
                    <View style={{ marginTop: FS_height(1.8) }}>
                        <Label style={[styles.txtAlign]}>{lang._50}</Label>
                        <Label style={[styles.txtAlign, styles.value]}>Male</Label>
                    </View>
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
        marginTop :-12
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
    deleteBtn :{
        alignSelf:"flex-start",
        paddingLeft:"5%",
        marginBottom:FS_height(3)
    },
    deleteTxt :{
        color:"#c43059",
        fontSize: FS_height(2.7)
    }
})

export default ViewProfile