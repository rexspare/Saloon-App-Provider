import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/Common";

const commonStyles = StyleSheet.create({

    container :{
        flex:1,
        backgroundColor:COLORS.primary,
    },

    _center: {
        justifyContent: "center",
        alignItems: "center"
    },

    _border :{
        borderWidth:1,
        borderColor : COLORS.subtle
    }
    ,
    fs_12: { fontSize: 12 },
    fs_16: { fontSize: 16 },
    fs_14: { fontSize: 14 },
    fs_20: { fontSize: 20 },
    fs_28: { fontSize: 28 },
    fs_40: { fontSize: 40 },

    fw_500: { fontWeight: '500' },
    fw_600: { fontWeight: '600' },
    fw_400: { fontWeight: '400' },
})

export default commonStyles