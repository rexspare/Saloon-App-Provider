import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'

const W100_Button = (props) => {
    return (
        <TouchableOpacity style={[
            styles.btnConatiner,
            { backgroundColor: props.disable ? COLORS.primary_Brand_Diasble : COLORS.primary_Brand},
            props.style
        ]}
            disabled={props.disable}
            activeOpacity={0.7}
            onPress={() =>props.onpress()}
        >
            <Text style={styles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

W100_Button.defaultProps = {
    title: "title",
    style: {},
    disable: false,
    onpress: () =>{alert("onpress")}
}

const styles = StyleSheet.create({
    btnConatiner: {
        width: "100%",
        height: 52,
        ...commonStyles._center,
    },

    btnText :{
        fontFamily: FONTS.Merriweather_Bold,
        color:COLORS.pure_White,
        fontSize: FS_val(16, 700)
    }

})

export default W100_Button