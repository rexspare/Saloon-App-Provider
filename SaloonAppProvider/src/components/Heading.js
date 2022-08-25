import { Text , StyleSheet} from 'react-native'
import React from 'react'
import { COLORS, FONTS, FS_height, FS_val } from '../utils/Common';
import { useSelector } from 'react-redux';

const Heading = ({children, fontSize =FS_val(20.5,700) , style}) => {
    return (
      <Text style={[ {fontSize, color: COLORS.secondary}, _style.textStyle, style]}>
        {children}
      </Text>
    );
  };

  const _style = StyleSheet.create({
    textStyle: {
      fontFamily: FONTS.Merriweather_Bold,
      letterSpacing: 0.7,
      textAlign:"center"
    },
  });

export default Heading