import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { COLORS } from '../utils/Common'
import Text_type1 from '../components/Text_type1';
import { lang } from '../assets/languages';


const MyDatePicker = (props)=> {

    const [Dateobj, setDateobj] = useState(new Date())
    // const [isDateTimePickerVisible,] = useState(true)
    const { onDateSelected, modalCallback } = props

    const _handleDatePicked = (date) => {
       
        modalCallback();
       
        onDateSelected && onDateSelected(date)
    }

   

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.isModalVisible}
                onRequestClose={() => {
                  
                    modalCallback();
                
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center", justifyContent: "center", padding: 15 }}>
                           

                     <Text_type1
                         style={{alignSelf: 'center'}}
                         bold={true}
                         color={COLORS.pure_Black}>
                         {lang._48}
                  </Text_type1>

                        </View>
                        <DatePicker
                            date={Dateobj}
                            mode='time'
                            is24hourSource="locale"
                            onDateChange={(date) => setDateobj(date)}
                            androidVariant="nativeAndroid"
                        />
                        <View style={{ flexDirection: "row", alignContent: "center", marginHorizontal: 10, padding: 10 }}>
                            <TouchableOpacity style={styles.modalBtn} activeOpacity={0.7} onPress={() =>  { modalCallback()} }>
                                <Text style={ { color: "#fff" }}>
                                   Cancel
                                </Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <TouchableOpacity style={styles.modalBtn} activeOpacity={0.7} onPress={() => _handleDatePicked(Dateobj) }>
                                    <Text style={ { color: "#fff" }}>
                                        Select
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    

  
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: COLORS.pure_White,
        paddingTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: "100%",
        elevation: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
    },
    modalBtn: {
        backgroundColor: COLORS.pure_Black, borderRadius: 15,
        paddingHorizontal: 15, paddingVertical: 10
    }
})

export default MyDatePicker;
