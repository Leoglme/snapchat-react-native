import React, {useEffect, useRef, useState} from 'react';
import * as Permissions from 'expo-permissions'
import {Camera} from "expo-camera";
import {Text, TouchableOpacity, StyleSheet, View, Modal, Image, Platform, AsyncStorage} from "react-native";
import AppIcon from "../components/AppIcon";
import snapTheme from '../components/theme'
import libmoji from "libmoji";
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";
import {withNavigationFocus} from "react-navigation";
import {CameraCapturedPicture} from "expo-camera/src/Camera.types";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import routes from "../../src/Constants/navigationStrings";
import TimeScreen from "./TimeScreen";
import {Ionicons} from "@expo/vector-icons";

const primaryColor = snapTheme.primaryColor;
const secondaryColor = snapTheme.secondaryColor;
const lightColor = snapTheme.lightColor;

const styles = StyleSheet.create({
    notAllowed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        padding: 20,
        backgroundColor: secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnText: {
        color: lightColor,
        fontSize: 18,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    captureBtn: {
        position: 'absolute',
        bottom: 85,
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: lightColor,
        borderWidth: 6,
        alignSelf: 'center'
    },
    photoLibraryContainer: {
        position: 'absolute',
        bottom: 85,
        width: 80,
        height: 80,
        right: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoLibraryButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        position: 'absolute',
        top: Constants.statusBarHeight + 10,
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    headerIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    sideItem: {
        position: 'absolute',
        top: 30,
        right: 10,
        borderRadius: 100,
        padding: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    sideIcons: {
        width: 40,
        height: 40
    },
    picture: {
        height: '100%',
        width: '100%'
    },
    sectionBottom: {
        position: 'absolute',
        bottom: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    sendBtn: {
        backgroundColor: primaryColor,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingRight: 20,
        paddingLeft: 5,
        bottom: 10,
        right: 10,
        position: 'absolute'
    },
    closeBtn: {
        padding: 2,
        position: 'absolute',
        top: 15,
    },
    btnSendText: {
        color: secondaryColor,
        fontSize: 15,
        fontWeight: 'bold',
    },
    sendIcon: {
        width: 40,
        height: 40,
    },
    bitmoji: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    currentDurationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 100,
        width: 25,
        height: 25,
        borderColor: snapTheme.lightColor
    },
    currentDuration: {
        color: snapTheme.lightColor,
        fontSize: 16,
    },
})


function CameraScreen(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [flashMode, setFlashMode] = useState('off');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [duration, setDuration] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTimer, setIsOpenTimer] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashIcon, setFlashIcon] = useState("flash-off-outline");

    /*State flash mode*/
    const changeFlashMode = () => {
        if (flashMode === 'off') {
            setFlashMode('on');
            setFlashIcon('flash-outline');
        } else {
            setFlashMode('off');
            setFlashIcon('flash-off-outline');
        }
    }

    /*State Picture*/
    const camRef = useRef(null);
    const takePicture = async () => {
        if (!camRef) {
            return;
        }
        try {
            const pic = await camRef.current.takePictureAsync({
                base64: true,
                quality: 0.1
            })
            setImageBase64(pic)
            setImagePreview(pic.uri)
            setIsOpen(true)
        } catch (error) {
            console.log('take Picture picture error', error);
        }
    }

    const pickerPicture = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImagePreview(result.uri);
            setImageBase64(result)
            setIsOpen(true)
        }
    }

    const closeImagePreview = () => {
        setImagePreview(false);
        setIsOpen(false);
    }

    const openContactList = async () => {
        props.navigation.navigate('ContactListScreen', {snap: {uri: imagePreview}, image: imageBase64, duration: duration});
        closeImagePreview();
    }

    /*State camera perms*/
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const rotatePicture = type === 2 && Platform.OS === 'ios' ? {transform: [{scaleX: (-1)}]} : null

    if(isOpenTimer){
        return (<>
            <Modal animation='fade' visible={true}>
                {/*<Text>{duration}</Text>*/}
                <TimeScreen image={imagePreview} onClose={() => setIsOpenTimer(false)}
                            durationSet={setDuration}
                />
            </Modal>
        </>)
    }

    /*Image preview*/
    if (imagePreview) {
        return (<>
            <StatusBar style='light' hidden={true}/>
            <Modal animationType='fade' visible={isOpen}>
                <Image source={{uri: imagePreview}} style={[styles.picture, rotatePicture]}/>
                <View style={styles.sectionBottom}>
                    {/*<AppIcon IonName={'send-outline'} size={25} color={lightColor}/>*/}
                    <TouchableOpacity style={styles.sendBtn} onPress={openContactList}>
                        <AppIcon IonName={'send'} size={20} color={snapTheme.thirdColor} style={styles.sendIcon}/>
                        <Text style={styles.btnSendText}>Send to</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.closeBtn}>
                    <AppIcon IonName={'close'} size={30} color={lightColor} onPress={closeImagePreview}/>
                </View>
            </Modal>
        </>)
    }
    let gender = libmoji.genders[libmoji.randInt(2)];
    let style = libmoji.styles[libmoji.randInt(3)];
    let traits = libmoji.randTraits(libmoji.getTraits(gender[0], style[0]));
    let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));
    const UserBitmoji = libmoji.buildPreviewUrl("head", 1, gender[1], style[1], 0, traits, outfit);

    return (<>
        <StatusBar style='auto' hidden={false}/>
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} flashMode={flashMode} ref={camRef}>

                <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>

                </TouchableOpacity>

                <View style={styles.photoLibraryContainer}>
                    <TouchableOpacity style={styles.photoLibraryButton} onPress={pickerPicture}>
                        <Ionicons name="images-outline" size={24} color={lightColor} />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Image style={styles.bitmoji} source={{uri: UserBitmoji}}/>
                </View>

                <View style={styles.sideItem}>
                    <AppIcon style={styles.sideIcons} AntName="logout" color={lightColor} size={22}
                             onPress={async () => {
                                 try {
                                     await AsyncStorage.removeItem('UserToken');
                                     props.navigation.navigate('InitialScreen2')
                                     return true;
                                 }
                                 catch(exception) {
                                     return false;
                                 }
                             }}
                    />
                    <AppIcon style={styles.sideIcons}
                             IonName="camera-reverse-outline"
                             color={lightColor}
                             size={24}
                             onPress={() => {
                                 setType(
                                     type === Camera.Constants.Type.back
                                         ? Camera.Constants.Type.front
                                         : Camera.Constants.Type.back
                                 );
                             }}
                    />
                    <AppIcon style={styles.sideIcons} IonName={flashIcon} color={lightColor} size={24}
                             onPress={changeFlashMode}/>
                    <View style={{alignItems: 'center', paddingTop: 5, paddingBottom: 8}}>
                        <TouchableOpacity style={styles.currentDurationContainer} onPress={() => {setIsOpenTimer(true)}}>
                            <Text style={styles.currentDuration}>{duration}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        </View>
    </>);
}


export default CameraScreen;
