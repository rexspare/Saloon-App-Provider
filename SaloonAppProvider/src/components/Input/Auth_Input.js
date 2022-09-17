import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, FS_val } from '../../utils/Common'
import commonStyles from '../../assets/styles/CommonStyles'
import If from '../If'
import Feather from 'react-native-vector-icons/Feather';

const Auth_Input = (props) => {

    const [isSecureTextEntry, setisSecureTextEntry] = useState(true)
    const { Icon, isError } = props;
    return (
        <View style={[Styles.mainContainer, props.styles]}>

            <View style={[Styles.inputContainer,
            { backgroundColor: COLORS.primary, borderColor: props.isInvalid ? "#ff0000" : COLORS.subtle }]}>
                <If condition={Icon}>
                    <TouchableOpacity
                        style={[Styles.iconContainer]}
                        onPress={() => setisSecureTextEntry(!isSecureTextEntry)}>
                        {Icon}
                    </TouchableOpacity>
                </If>
                <TextInput
                    style={[Styles.inputStyle, { color: COLORS.subtle, paddingLeft: Icon ? 0 : 10, fontFamily: FONTS.WorkSans_SemiBold }]}
                    secureTextEntry={props.isPassword ? isSecureTextEntry : false}
                    placeholder={props.placeholder}
                    value={props?.value}

                    placeholderTextColor={COLORS.subtle}
                    onChangeText={props.onChange}
                    editable={props.editable}



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
    placeholder: "placeholder",
    onChange: () => { },
    isPassword: false,
    isInvalid: false,
    editable: true
}

const Styles = StyleSheet.create({
    mainContainer: {
        width: '88%',
        maxWidth: 500,
        alignSelf: "center",
    },
    inputContainer: {
        height: 50,
        flexDirection: "row",
        borderRadius: 5,
        ...commonStyles._border,
        elevation: 3
    },
    inputStyle: {
        flex: 1,
        height: 50,
        fontFamily: FONTS.WorkSans_Medium,
        fontSize: FS_val(14.5, 700),
        paddingHorizontal: 10,
        color: COLORS.secondary
    },
    iconContainer: {
        width: '15%',
        ...commonStyles._center
    }

})

export default Auth_Input