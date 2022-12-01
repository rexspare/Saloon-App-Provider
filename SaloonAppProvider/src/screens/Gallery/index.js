import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Text,
    ImageBackground
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CommonStyles from '../../assets/styles/CommonStyles';

import {
    height,
    width,
    COLORS,
    FS_height,
    FS_val,
    FONTS,
} from '../../utils/Common';
import { lang } from '../../assets/languages';
import {
    Layout,
    Heading,
    Text_type1,
    Label,
    CurveHeader,
} from '../../components';
import { Auth_Button } from '../../components/Buttons';
// import { ROUTES } from "../../../remote/Routes";
import { BASE_URL, ROUTES } from '../../Data/remote/Routes'
import apiRequest from '../../Data/remote/Webhandler'
import { showFlash } from '../../utils/MyUtils'
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';


const Gallery = (props) => {
    const user = useSelector((state) => state.authReducer.user)
    const [imageObjectArray, setimageObjectArray] = useState([])
    const [gallery, setgallery] = useState([])
    const [deletArray, setdeletArray] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [isLoading_, setisLoading_] = useState(false)
    const [refreshState, setrefreshState] = useState(false)

    const openGallery = (multiple) => {
        ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setimageObjectArray(image)
            console.log(image);
        }).catch(() => { })
    }

    const removeImage = (path) => {
        let filtered = imageObjectArray?.filter((image) => image?.path != path)
        setimageObjectArray(filtered)
    }

    useEffect(() => {
        getgallery()
    }, [])

    const getgallery = async () => {
        const result = await apiRequest({
            method: "POST",
            url: ROUTES.GET_GALLERY_IMAGE,
            data: { user_id: user?.id }
        }).catch((err) => {
            showFlash("Network Error", "danger", 'auto',)
        })
        if (result?.data?.status == true) {
            setgallery(result?.data?.data)
            setdeletArray([])
        }
    }


    const uploadGallery = async () => {

        setisLoading(true)
        if (imageObjectArray?.length > 0) {
            let form = new FormData()
            form.append('user_id', user?.id);

            imageObjectArray.forEach((imageObject, index) => {
                form.append(`images[${index}]`,
                    { uri: imageObject?.path, type: imageObject?.mime, mime: imageObject?.mime, name: 'profile.png' })
            })

            const result = await fetch(BASE_URL + ROUTES.UPLOAD_GALLERY_IMAGES, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: form
            })
                .then((response) => response.json())
                .then((json) => {
                    setisLoading(false)
                    return json
                })
                .catch((error) => {
                    console.error(error);
                });

                console.log(result.data);
                

            if (result?.status) {
                showFlash(result?.message, 'success', 'none')
                console.log('====================================');
                console.log(result.data);
                console.log('====================================');
                setimageObjectArray([])
                getgallery()

            } else {
                showFlash(result?.message, 'danger', 'none')
            }
        } else {
            showFlash('select atleast one image', 'danger', 'none')
        }
        setisLoading(false)
    }

    const addRemove = (image) => {
        const exists = deletArray?.find((x) => x?.id == image?.id)

        if (exists) {
            let mList = deletArray?.filter((x) => x?.id != image.id)
            setdeletArray(mList)
        } else {
            let mList = deletArray
            mList.push(image)
            setdeletArray(mList)
        }
        setrefreshState(!refreshState)
    }

    const getState = (image) => {
        const exists = deletArray?.find((x) => x?.id == image?.id)
        if(exists){
            return true
        } else {
            return false
        }
    }

    const deleteGallery = async () => {

        setisLoading_(true)
        if (deletArray?.length > 0) {
            let arr = []

            deletArray.forEach((imageObject, index) => {
                arr.push(imageObject.id)
            })


            const result = await apiRequest({
                method: "POST",
                url: ROUTES.DELETE_GALLERY_IMAGES,
                data: { images_id : JSON.stringify(arr)}
            }).catch((err) => {
                showFlash("Network Error", "danger", 'auto',)
            })
            if (result?.data?.status == true) {
                getgallery()
                showFlash(result?.data?.message, 'success', 'none')
            } else {
                showFlash(result?.data?.message, 'danger', 'none')
            }
        } else {
            showFlash('select atleast one image', 'danger', 'none')
        }
        setisLoading_(false)
    }

    return (
        <View style={CommonStyles.container}>
            <Layout fixed={false}>
                <CurveHeader />

                <Text_type1 style={{ textAlign: "left", width: '90%', alignSelf: 'center', marginVertical: 15 }}>
                    These images represent your Salon and should be accurate</Text_type1>

                <View style={[styles.container, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                    {
                        imageObjectArray?.map((image, index) => {
                            return (
                                <View style={styles.chip} key={index}>
                                    <Text style={styles.chipText}
                                    >{image?.path?.split('/')[image?.path?.split('/').length - 1]}</Text>
                                    <TouchableOpacity onPress={() => removeImage(image?.path)}>
                                        <Feather name='x' size={FS_height(3)} color={COLORS.secondary} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ paddingHorizontal: '5%', alignItems: 'flex-end', marginVertical: 10 }}>
                    <TouchableOpacity style={{ width: FS_height(7), ...CommonStyles._center, }}
                        onPress={() => openGallery()}>
                        <Feather name='camera' size={FS_height(4)} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>


                <View style={styles.sectionContainer}>
                    <Auth_Button
                        title={'Upload'}
                        onpress={() => uploadGallery()}
                        isLoading={isLoading}
                    />
                </View>
                <Label style={{ textAlign: 'left', margin: 15, textDecorationLine: 'underline' }}>
                    Business Gallery:</Label>
                <View style={styles.gallerycontainer}>
                    {
                        gallery?.map((image, index) => {
                            let includes = deletArray?.find((x) => x?.id == image?.id)
                            return (
                                <ImageBackground
                                    key={index}
                                    source={{ uri: BASE_URL + 'uploads/' + image?.image }}
                                    style={styles.imageBg}
                                >
                                    <TouchableOpacity style={[styles.cross, {
                                        backgroundColor: getState(image) ? "#FF6666" : "#c2c1c0",
                                    }]}
                                        onPress={() => { addRemove(image) }}
                                    >
                                        <Feather name='x' size={FS_height(3)} color={COLORS.primary} />
                                    </TouchableOpacity>

                                </ImageBackground>
                            )
                        })
                    }
                </View>

                {
                    gallery?.length > 0 &&
                    <View style={styles.sectionContainer}>
                        <Auth_Button
                            title={'Delete'}
                            onpress={() => deleteGallery()}
                            isLoading={isLoading_}
                            style={{ backgroundColor: "#FF6666", }}
                        />
                    </View>
                }
            </Layout>
        </View>
    )
}

export default Gallery;

const styles = StyleSheet.create({
    HeaderContainer: {
        width: width,
        paddingHorizontal: '5%',
        paddingVertical: 25,
        ...CommonStyles._center,
    },

    container: {
        width: '88%',
        maxWidth: 500,
        alignSelf: "center",
        borderWidth: 2,
        borderRadius: 7,
        minHeight: 50,
        alignItems: 'center'
    },
    chip: {
        backgroundColor: '#c2c1c0',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        paddingHorizontal: 5
    },
    chipText: {
        fontFamily: FONTS.WorkSans_Medium,
        fontSize: 12,
        marginRight: 5
    },
    sectionContainer: {
        // paddingHorizontal: '5%',
        marginBottom: 15,
        ...CommonStyles._center,
    },
    gallerycontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width,
        justifyContent: 'space-evenly',
        marginBottom: 15
    },
    imageBg: {
        width: width * 0.3,
        height: width * 0.3,
        alignItems: 'flex-end',

    },
    cross: {
        width: FS_height(4),
        height: FS_height(4),
        ...CommonStyles._center,
        borderRadius: FS_height(2),
        margin: 6,
    }
});


