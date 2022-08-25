import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'
import Heading from '../Heading'
import If from '../If'
import Feather from 'react-native-vector-icons/Feather';

const Auth_Input = (props) => {

    const [isSecureTextEntry, setisSecureTextEntry] = useState(true)

    return (
        <View style={[Styles.mainContainer, props.styles]}>
            <Heading style={{ textAlign: 'left', marginVertical: 8, letterSpacing: 0.8 }}
                fontSize={FS_val(14, 700)}>
                {props.title}
            </Heading>
            <View style={[Styles.inputContainer, { backgroundColor: "#EFEFEF" }]}>
                <TextInput
                    style={[Styles.inputStyle, { color: COLORS.secondary }]}
                    secureTextEntry={props.isPassword ? isSecureTextEntry : false}
                    placeholder={props.placeholder}
                    placeholderTextColor={COLORS.subtle}
                />
                <If condition={props.isPassword}>
                    <TouchableOpacity style={[Styles.iconContainer]}
                        onPress={() => setisSecureTextEntry(!isSecureTextEntry)}>
                        <Feather name={isSecureTextEntry ? 'eye' : 'eye-off'} color={"#000000"} size={22} />
                    </TouchableOpacity>
                </If>

            </View>
        </View>
    )
}

Auth_Input.defaultProps = {
    title: "title",
    placeholder: "placeholer",
    onChange: () => { },
    isPassword: false
}

const Styles = StyleSheet.create({
    mainContainer: {
        width: '80%',
        alignSelf: "center"
    },
    inputContainer: {
        height: 52,
        flexDirection: "row",
        elevation: 5,
        borderRadius: 5,
    },
    inputStyle: {
        flex: 1,
        height: 52,
        fontFamily: FONTS.WorkSans_Medium,
        fontSize: FS_val(14.5, 700),
        paddingHorizontal: 10
    },
    iconContainer: {
        width: '17%',
        ...commonStyles._center
    }

})

export default Auth_Input