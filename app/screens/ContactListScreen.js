import React, {useState} from 'react';
import {Alert, ImageBackground, Platform, StyleSheet, Text, View} from "react-native";
import Constants from "expo-constants";
import snapTheme from "../components/theme";
import AppIcon from "../components/AppIcon";
import {BlurView, VibrancyView} from "@react-native-community/blur";
import {Entypo} from "@expo/vector-icons";
import {SearchBar} from 'react-native-elements';
import UserList from '../../Api/userList'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    closeBtn: {
        padding: 2,
        position: 'absolute',
        top: Constants.statusBarHeight + 5,
        left: 10,
        zIndex: 999
    },
    filter: {
        backgroundColor: "rgba(0,0,0,0.5)",
        height: '100%',
        width: '100%',

    }
});


function ContactListScreen(props) {
    const currentPicture = props.route.params !== undefined ? props.route.params.snap : null;
    const duration = props.route.params !== undefined ? props.route.params.duration : null;
    const snapImage = props.route.params !== undefined ? props.route.params.image : null;

    const closeUserList = () => {
        props.navigation.navigate('BottomNavScreen');
    }
    return (<>
        <View style={styles.container}>
            <ImageBackground source={currentPicture} style={styles.image} blurRadius={180}>
                <View style={styles.filter}>
                    <View style={styles.closeBtn}>
                        <Entypo name="chevron-left" size={30} color={snapTheme.lightColor} onPress={closeUserList}/>
                    </View>
                    <UserList searchBar={true} snapImage={snapImage} duration={duration} navigation={props.navigation}/>
                </View>
            </ImageBackground>
        </View>
    </>);
}

export default ContactListScreen;
