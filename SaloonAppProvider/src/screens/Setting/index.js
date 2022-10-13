import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Layout } from '../../components'
import MenuItem from '../../components/MenuItem'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import GoBackHeader from '../../components/GoBackHeader'

const Setting = (props) => {
    const Menu = [
        {
            id: 1,
            title: "Notification Settings",
            callBack:() =>  {}
        },
        {
            id: 2,
            title: "For Partners",
            callBack:() =>  {}
        },
        {
            id: 3,
            title: "Privacy Policy",
            callBack:() =>  {}
        },
        {
            id: 4,
            title: "Terms of Service",
            callBack:() =>  {}
        },
        {
            id: 5,
            title: "Terms of Use",
            callBack:() =>  {}
        },
    ]
    
    return (
        <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <GoBackHeader onpress={() => props.navigation.goBack()} />
            <Layout fixed={false}>

                {/* List Items */}
                {
                    Menu.map((item) => (
                        <MenuItem
                            key={item.id}
                            title={item.title}
                            onpress={() => item.callBack()}
                        />
                    ))
                }
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        width: width,
        height: height * 0.41,
        justifyContent: "space-evenly",
        alignItems: 'center',
        paddingTop: "10%",
        paddingBottom: "8%"
    },
    imageContainer: {
        width: width * 0.37,
        height: width * 0.37,
        borderRadius: width * 0.2,
        borderWidth: 3,
        borderColor: COLORS.Links,
        ...commonStyles._center

    },
    image: {
        width: width * 0.37 - 10,
        maxWidth: 200,
        height: width * 0.37 - 10,
        maxHeight: 200,
        borderRadius: width * 0.2,
    },
    viewProfile: {
        color: COLORS.Links,
        fontSize: FS_height(2.4),
    }
})

export default Setting