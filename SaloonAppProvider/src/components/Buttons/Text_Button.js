import { View, Text, TouchableOpacity , StyleSheet} from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'

const Text_Button = (props) => {
    return (
       <View  style={[props.style, styles.btnConatiner]} >
         <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.onpress()}
            disabled={props.disable}
        >
            <Text style={[styles.btnText, props.textStyles]}>{props.title}</Text>
        </TouchableOpacity>
       </View>
    )
}

Text_Button.defaultProps = {
    title: "title",
    style: {},
    disable: false,
    onpress: () => alert("yeyy")
}

const styles = StyleSheet.create({
    btnConatiner: {
        height: 45,
        ...commonStyles._center,
    },

    btnText :{
        fontFamily: FONTS.Merriweather_Bold,
        color:COLORS.primary_Brand,
        fontSize: FS_val(16, 700)
    }

})

export default Text_Button