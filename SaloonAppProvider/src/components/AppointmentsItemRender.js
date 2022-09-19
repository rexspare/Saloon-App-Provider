import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CurveHeader, Heading, Label, Text_type1, Layout } from '../components';
import { COLORS, FONTS, FS_height, FS_val } from '../utils/Common';

export default function AppointmentsItemRender(props) {
    const {
        name,
        phone,
        title,
        description,
        time,
        start_time,
        end_time,
        price
    } = props

    return (
        <View  >
            <View style={styles.container}>
                {console.log("Values Received ==> ", name, title)}

                <View >

                    <View style={{ justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5 }} >

                        <View style={{ flexDirection: 'row' }}>

                            <Text_type1
                                style={{ textAlign: "left" }}
                                color={COLORS.subtle}>
                                {'Name: '}
                            </Text_type1>

                            <Text_type1
                                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.pure_Black}>
                                {`${name}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={COLORS.subtle}>
                                {'Phone: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.pure_Black}>
                                {`${phone}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}
                                color={COLORS.subtle}>
                                {'Title: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium, marginEnd: 30 }}

                                color={COLORS.pure_Black}>
                                {`${title}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={COLORS.subtle}>
                                {'Time: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.pure_Black}>
                                {`${time}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={COLORS.subtle}>
                                {'Start time: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.pure_Black}>
                                {`${start_time}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={COLORS.subtle}>
                                {'End time: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.pure_Black}>
                                {`${end_time}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={COLORS.subtle}>
                                {'Price: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.pure_Black}>
                                {`${price}`}
                            </Text_type1>
                        </View>


                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        marginHorizontal: 20,
        borderRadius: 25,
        backgroundColor: COLORS.pure_White,
        paddingVertical: 15,
        marginTop: 15,
        elevation: 5,



    }
})