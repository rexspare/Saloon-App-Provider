import { Pressable, StyleSheet, View, Image } from "react-native";
import React from "react";
import Label  from '../components/Label';
import { height, width, FS_height, FONTS, COLORS } from "../utils/Common";

const RadioBox = (props) => {

    const { isChecked, title } = props

    const markedIcon = require("../assets/images/checkbox_marked.png")
    const unMarkedIcon = require("../assets/images/checkbox_outline.png")

    const iconName = isChecked ? markedIcon : unMarkedIcon

    return (
        <View style={[styles.container, { backgroundColor :COLORS.grey}]}>
            <Pressable onPress={props.onPress}>
                <Image source={iconName}
                    style={styles.icon_view}
                />
            </Pressable>

            <Label style={styles.labelStyles}>{title}</Label>

        </View>
    );
};

export default RadioBox;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width : '47%',
        height: height * 0.065,
        marginTop: 5,
        borderRadius: 6,
        paddingStart: 25,
        
    },
 
    icon_view: {
        width: 20,
        height: 20,

    },

    labelStyles: {
        paddingVertical: 8,
        marginLeft: width * 0.06,
        fontSize: FS_height(2.3),
        fontFamily: FONTS.WorkSans_SemiBold,
      },
});