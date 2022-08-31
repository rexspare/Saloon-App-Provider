import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, width } from '../utils/Common'
import commonStyles from '../assets/styles/CommonStyles'
import Label from './Label'

const DiscoverItem_2 = (props) => {
    const { item, style } = props
    return (
        <View style={[styles._container, style]}>
            <Image source={{ uri: item.image }}
                style={styles._image} />
            <View style={styles._view}>
                <Label style={styles._label}>{item.name}</Label>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    _container: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 13,
        backgroundColor: COLORS.primary,
        elevation:4,
        marginVertical:5,
        marginHorizontal : width * 0.015,
        borderWidth: 1/2,
        borderColor:COLORS.subtle
    },
    _image: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13
    },
    _view: {
        flex:1,
        borderBottomLeftRadius:13,
        borderBottomRightRadius:13,
        backgroundColor:COLORS.primary,
        justifyContent:"center"
    },
    _label :{
        fontFamily:FONTS.WorkSans_SemiBold,
        fontSize:FS_height(1.8)
    }
})

export default DiscoverItem_2