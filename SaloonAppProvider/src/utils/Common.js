import { Dimensions } from "react-native"
import {
    RFPercentage as FS_height,
    RFValue as FS_val
} from "react-native-responsive-fontsize";

const FONTS = {
    Merriweather_Bold: "Merriweather-Bold",
    Merriweather_Regular: "Merriweather-Regular",
    WorkSans_Bold: "WorkSans-Bold",
    WorkSans_ExtraBold: "WorkSans-ExtraBold",
    WorkSans_Light: "WorkSans-Light",
    WorkSans_Medium: "WorkSans-Medium",
    WorkSans_Regular: "WorkSans-Regular",
    WorkSans_SemiBold: "WorkSans-SemiBold"
}

const COLORS = {
    primary: "#FFFFFF",
    secondary: "#000000",
    tertiary :"#00a36e",
    pure_White: "#FFFFFF",
    pure_Black: "#000000",
    accent: "#f9db8f",
    _accents:"#fbd74b",
    accent_rgba: "rgba(249, 219, 143, 255)",
    subtle :"#878c92",
    success :"#00a36e",
    Links :"#0044CC",
    grey: "#EDEDED",

}

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


export {
    FONTS,
    COLORS,
    width,
    height,
    FS_height,
    FS_val
}