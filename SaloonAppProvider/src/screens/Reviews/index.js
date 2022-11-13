import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GoBackHeader, Heading, If, Label, Layout, MenuItem, Text_type1 } from '../../components'
import commonStyles from '../../assets/styles/CommonStyles'
import { COLORS, FONTS, FS_height, FS_val, height, width } from '../../utils/Common'
import { lang } from '../../assets/languages'
import { ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../Data/Local/Store/Actions'

export default function Reviews(props) {

    const user = useSelector((state) => state.authReducer.user)
    const reviewList = useSelector((state) => state.authReducer.reviews)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReviews(user.id))
      }, [])

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: COLORS.primary }]}>
            <GoBackHeader onpress={() => props.navigation.goBack()} title={lang._52} />
            <Layout fixed={false}>
                <View>
                    {/* NO REVIEWS */}
                    <If condition={reviewList?.length == 0}>
                        <Text_type1 style={{ marginTop: 40 }}>
                            {lang._53}</Text_type1>
                    </If>

                    {/* REVIEWS */}
                    <If condition={reviewList?.length != 0}>
                        <View>
                            {
                                reviewList?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={styles.mainItem}
                                    >
                                        <Label>{item.username}</Label>
                                        <Rating
                                            showRating={false}
                                            readonly={true}
                                            imageSize={FS_height(2.4)}
                                            startingValue={item?.rating_star}
                                            style={{ marginVertical: 5 }}
                                        />
                                        <Text_type1 style={{ textAlign: "left" }}>
                                            {item?.comments}</Text_type1>
                                    </View>
                                ))
                            }
                        </View>
                    </If>
                </View>
            </Layout>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainItem: {
      width: width * 0.9,
      alignItems: 'flex-start',
      marginHorizontal: '5%',
      paddingVertical: 15,
      borderBottomWidth: 1 / 2,
      borderColor: COLORS.subtle

  },
  nameRating: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  floatingBtn: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: COLORS.secondary,
      position: "absolute",
      bottom: 20,
      right: 20,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center'
  }
})