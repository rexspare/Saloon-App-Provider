import React from "react"
import { showMessage, hideMessage } from "react-native-flash-message";
import { FONTS } from "./Common";

const showFlash = (msg, type, icon, isFloating) => {
    showMessage({
        message: msg,
        type: type,
        icon:icon,
        floating :true,
        textStyle:{fontFamily: FONTS.WorkSans_Medium },
        titleStyle:{fontFamily: FONTS.WorkSans_Medium },
      });
}

export {
    showFlash
}