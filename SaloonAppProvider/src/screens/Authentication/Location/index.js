import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

const { width, height } = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Auth_Button } from '../../../components/Buttons'
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { showFlash } from '../../../utils/MyUtils'
import { COLORS } from '../../../utils/Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Location(props) {

    const [lat, setlat] = useState(28.4212)
    const [lon, setlon] = useState(70.2989)
    const [searchInput, setsearchInput] = useState("")
    const [Address, setAddress] = useState("")
    const [isPermissionAllowed, setisPermissionAllowed] = useState(false)
    const MapRef = useRef()

    const getGeoCodePosition = (latitude, longitude) => {
        Geocoder.geocodePosition({
            lat: latitude,
            lng: longitude
        }).then(res => {
            setsearchInput(res[0].formattedAddress)
            setAddress(res[0].formattedAddress)
        })
            .catch(() => showFlash("Error getting location", 'danger', 'none'))
    }

    const SearchMap = () => {
        Geocoder.geocodeAddress(searchInput).then(res => {
            setlat(res[0].position.lat);
            setlon(res[0].position.lng)
            console.log(res[0].formattedAddress);
            setsearchInput(res[0].formattedAddress)
            setAddress(res[0].formattedAddress)
            MapRef.current.animateCamera({
                center: {
                    latitude: res[0].position.lat,
                    longitude: res[0].position.lng,
                },
                duration: 1000
            });
        })
            .catch(() => showFlash("Enter valid address", 'danger', 'none'))

    }

    const handleLocationRequest = () => {

        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((result) => {
                if (result === RESULTS.GRANTED) {
                    console.log("==========> GRANTED")
                    setisPermissionAllowed(true)
                    getCurrentLocation()
                } else {
                    setisPermissionAllowed(false)
                    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                        if (result === RESULTS.GRANTED) {
                            setisPermissionAllowed(true)
                            getCurrentLocation()
                        }
                        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                            if (result === RESULTS.GRANTED) {
                                setisPermissionAllowed(true)
                                getCurrentLocation()
                            }
                        })
                    });
                }
            })
    }

    const getCurrentLocation = () => {
        if (isPermissionAllowed) {
            console.log("==========CURRENT LOCATION")
            Geolocation.getCurrentPosition(
                (position) => {
                    setlat(position.coords.latitude)
                    setlon(position.coords.longitude)
                    getGeoCodePosition(position.coords.latitude, position.coords.longitude);

                    MapRef.current.animateCamera({
                        center: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        duration: 1000
                    });
                },
                (error) => {
                    // See error code charts below.
                    showFlash(error.code, error.message, 'danger', 'none')
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }


    return (


        <View style={[Styles.MainConatner]}>



            <View style={[Styles.header, { backgroundColor: COLORS.pure_Black }]}>
                <Text style={{ color: 'white', fontSize: 17 }}>
                    Select your location</Text>
            </View>

            {/* MAPS */}
            <View style={Styles.mapContainer}>

                <MapView
                    ref={MapRef}
                    style={Styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.0200,
                        longitudeDelta: 0.0200,
                    }}
                    // onRegionChange={(e) => { setlat(e.latitude); setlon(e.longitude) }}
                    onRegionChangeComplete={(e) => {
                        getGeoCodePosition(e.latitude, e.longitude);
                        setlat(e.latitude);
                        setlon(e.longitude)
                    }}
                >
                </MapView>

                <View style={{ position: 'absolute', paddingBottom: height * 0.042 }}>

                    <Ionicons name={'location'} color={COLORS.pure_Black} size={40} />
                </View>

                {/* INPUT  */}
                <View style={[Styles.Field, {}]}>

                    <TextInput style={{ width: '85%', color: 'black', fontSize: 15, }}
                        placeholder='Search'
                        value={searchInput}
                        onChangeText={(text) => setsearchInput(text)}
                    />
                    <TouchableOpacity
                        onPress={() => { SearchMap() }}
                    >

                        <Ionicons name={'search'} color={COLORS.pure_Black} size={27} />
                    </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View style={Styles.BtnContainer}>


                    <Auth_Button title={"Done"}
                        style={{ width: '83%' }}
                        onpress={() => {
                            props?.route?.params?.setCoords({
                                lat: lat,
                                long: lon,
                                address : Address
                            })
                            props.navigation.goBack()
                        }}

                    />


                    <TouchableOpacity
                        style={{ height: '100%', backgroundColor: COLORS.secondary, width: '15%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { handleLocationRequest() }} >
                        <MaterialIcons name={'my-location'} color={COLORS.pure_White} size={25} />
                    </TouchableOpacity>

                </View>


            </View>

        </View>

    )
}

const Styles = StyleSheet.create({
    MainConatner: {
        flex: 1,
        // borderWidth: 2,
    },
    header: {
        width: width,
        height: height * 0.075,
        flexDirection: 'row',
        // borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    map: {
        // ...StyleSheet.absoluteFillObject,
        height: height * 0.925,
        width: width
    },

    mapContainer: {
        height: height * 0.925,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Field: {
        width: '82%',
        height: height * 0.0650,
        marginVertical: height * 0.015,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontFamily: 'WorkSans-Medium',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.pure_White,
        borderRadius: 20,
        position: 'absolute',
        top: 15,
        alignItems: 'center'
    },
    BtnContainer: {
        flexDirection: 'row',
        width: width * 0.85,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },



});