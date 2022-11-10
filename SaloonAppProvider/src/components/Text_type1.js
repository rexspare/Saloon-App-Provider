import { Text , StyleSheet} from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, FS_val } from '../utils/Common';

const Text_type1 = ({children, fontSize = FS_height(2.1) , style, bold , color}) => {
    return (
      <Text style={[ {fontSize, color: color ? color : COLORS.secondary , fontFamily: bold ? FONTS.WorkSans_Bold : FONTS.WorkSans_SemiBold}, _style.textStyle, style]}>
        {children}
      </Text>
    );
  };

  const _style = StyleSheet.create({
    textStyle: {
    //   letterSpacing: 0.7,
      textAlign:"center"
    },
  });

export default Text_type1