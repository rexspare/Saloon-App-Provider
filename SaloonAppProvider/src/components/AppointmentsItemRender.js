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
                                color={'green'}>
                                {'Name: '}
                            </Text_type1>

                            <Text_type1
                                style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.subtle}>
                                {`${name}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={'green'}>
                                {'Phone: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.subtle}>
                                {`${phone}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}
                                color={'green'}>
                                {'Title: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium, marginEnd: 30 }}

                                color={COLORS.subtle}>
                                {`${title}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={'green'}>
                                {'Time: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.subtle}>
                                {`${time}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={'green'}>
                                {'Start time: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.subtle}>
                                {`${start_time}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={'green'}>
                                {'End time: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.subtle}>
                                {`${end_time}`}
                            </Text_type1>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text_type1
                                style={{ textAlign: "left" }}

                                color={'green'}>
                                {'Price: '}
                            </Text_type1>

                            <Text_type1
                               style={{ textAlign: "left", fontFamily: FONTS.WorkSans_Medium}}

                                color={COLORS.subtle}>
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