import { View, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState , useEffect} from 'react'
import CommonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import { Auth_Input } from '../../components/Input'
import { Auth_Button, Social_Button, Text_Button } from '../../components/Buttons'
import { Layout, Heading, Text_type1, Label, CurveHeader } from '../../components'
import { lang } from '../../assets/languages'
import EmailSelector from '../../components/EmailSelector'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const AuthScreen = (props) => {
  const [provider, setprovider] = useState('')
  const [email, setemail] = useState('')
  const [finalEmail, setfinalEmail] = useState()

  const { navigation } = props

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "1088713579994-l9damt0c9dpn89vvvv3cnjafdv6uccg9.apps.googleusercontent.com",
      offlineAccess: true
    });
  }, [])

  const GoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => { console.log(result) });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error)
      }
    }
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Layout fixed={false}>

        <CurveHeader />
        <View style={{}}>

          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading > {lang._1}</Heading>
            <Text_type1 style={{paddingHorizontal: '5%'}}> {lang._2} </Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>

            <Auth_Input
              placeholder={lang._7}
              value={email}
              onChange={(txt) => setemail(txt)}
            />

            <EmailSelector onpress={(provider) => setemail(email.split("@")[0] + provider)} />

            <Auth_Button title={lang._3} style={{ marginVertical: 15 }}
              onpress={() => navigation.navigate("SignUp",{email : email})} />
            <Text_type1 style={styles.orTxt}>OR</Text_type1>
          </View>

          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={[styles.sectionContainer, { paddingTop: 0 }]}>
            <Social_Button type="facebook" />
            <Social_Button type="google" style={{ marginVertical: 20 }}
            onpress={() => GoogleSignUp()} />

            <Label>{lang._4}</Label>
            <Text_type1 style={{ color: COLORS.subtle, marginVertical: 3 }}>{lang._5}</Text_type1>
            <Text_Button textStyles={{color: COLORS.Links}} title={lang._6} />
          </View>

          {/*  ==============   END   =================== */}


        </View>

      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


  HeaderContainer: {
    width: width,
    paddingHorizontal: '5%',
    paddingVertical: 25,
    ...CommonStyles._center,
  },

  sectionContainer: {
    // paddingHorizontal: '5%',
    marginBottom: 15,
    ...CommonStyles._center,
  },
  orTxt: {
    color: COLORS.subtle,
    fontSize: FS_height(2.2)
  }

})

export default AuthScreen


// Valid from: Wed Aug 31 10:40:30 PDT 2022 until: Sun Jan 16 09:40:30 PST 2050
// Certificate fingerprints:
//          SHA1: 28:9F:5A:CC:46:75:FB:DC:1A:73:CE:73:29:DE:CE:71:43:1A:E0:7D
//          SHA256: 29:02:06:71:86:40:9C:38:7C:46:9A:93:CC:D1:3B:2F:65:5C:20:CD:91:0F:42:68:86:03:95:A9:39:02:99:FF
// Signature algorithm name: SHA256withRSA
// Subject Public Key Algorithm: 2048-bit RSA key