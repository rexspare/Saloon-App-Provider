import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import CommonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FS_height, height, width } from '../../utils/Common'
import { Auth_Input } from '../../components/Input'
import { Auth_Button, Social_Button, Text_Button } from '../../components/Buttons'
import { Layout, Heading, Text_type1, Label, CurveHeader, If } from '../../components'
import { lang } from '../../assets/languages'
import EmailSelector from '../../components/EmailSelector'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import apiRequest from '../../Data/remote/Webhandler'
import { ROUTES } from '../../Data/remote/Routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { registerUser, setUser, setIsUserLoggedIn } from '../../Data/Local/Store/Actions/AuthActions'

const AuthScreen = (props) => {
  const [email, setemail] = useState('')
  const [isEmailEmpty, setisEmailEmpty] = useState(false)
  const [isLoading, setisLoading] = useState(false)

  const { navigation } = props
  const dispatch = useDispatch()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "1088713579994-l9damt0c9dpn89vvvv3cnjafdv6uccg9.apps.googleusercontent.com",
      offlineAccess: true
    });
  }, [])

  const handlecontinue = async () => {
    setisEmailEmpty(false)
    setisLoading(true)
    if (email != "") {
      const result = await apiRequest({
        method: "post",
        url: ROUTES.CHECK_USER,
        data: { email },
      }).catch((err) => {
        console.log(err)
        setisLoading(false)
      });
      if (result.data.status) {
        navigation.navigate("SignIn", { email })
      } else {
        navigation.navigate("SignUp", { email })

      }
    } else {
      setisEmailEmpty(true)
    }
    setisLoading(false)

  }

  const GoogleSignUp = async () => {
    setisLoading(true)
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(async (result) => {
        const response = await dispatch(
          registerUser({
            email: result.user?.email,
            username: result.user?.name,
            role: 'customer',
            googleID: result.user?.id
          },
            () => { })
        );
        if (response.authenticity === true) {
          callBack(true)
        }
      });
    } catch (error) {
      setisLoading(false)
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
    setisLoading(false)
  };

  const callBack = () => {
    dispatch(setUser({ email: "email@gmail.com" }))
    dispatch(setIsUserLoggedIn(true))
  }

 

  useEffect(() => {
    AsyncStorage.getItem("@Email")
      .then((email) => {
        if (email) {
          navigation.navigate("Verify", { email: email })
        }
      })
  }, [])


  return (
    <SafeAreaView style={CommonStyles.container}>
      <Layout fixed={false}>

        <CurveHeader />
        <View style={{}}>

          {/*  ==============   SECTION 1   =================== */}
          <View style={styles.HeaderContainer}>
            <Heading > {lang._1}</Heading>
            <Text_type1 > {lang._2} </Text_type1>
          </View>
          {/*  ==============   END   =================== */}

          {/*  ==============   Section 2   =================== */}
          <View style={styles.sectionContainer}>

            <Auth_Input
              placeholder={lang._7}
              value={email}
              onChange={(txt) => setemail(txt)}
              isInvalid={isEmailEmpty}
            />

            <If condition={isEmailEmpty}>
              <Text style={CommonStyles._errorText}>This Field is required</Text>
            </If>

            <EmailSelector onpress={(provider) => setemail(email.split("@")[0] + provider)} />

            <Auth_Button title={lang._3} style={{ marginVertical: 15 }}
              onpress={() => handlecontinue()}
              isLoading={isLoading} />
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
            <Text_Button title={lang._6} />
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