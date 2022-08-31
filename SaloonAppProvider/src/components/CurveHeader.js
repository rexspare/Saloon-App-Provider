import { View, ImageBackground ,StyleSheet} from 'react-native'
import Branding from './Branding'
import React from 'react'
import { height ,width} from '../utils/Common'
import CommonStyles from '../assets/styles/CommonStyles'

const CurveHeader = () => {
  return (
    <View style={styles.curveContainer}>
          <ImageBackground
            source={require("../assets/images/Image_1.jpg")}
            style={styles.curveContainer}
          >
            <Branding style={{ marginTop: height * 0.06 }} />
          </ImageBackground>
        </View>
  )
}


const styles = StyleSheet.create({

    curveContainer: {
      width: width,
      height: height * 0.16,
      alignItems: "center",
      ...CommonStyles._center
    },
  
  })
  

export default CurveHeader