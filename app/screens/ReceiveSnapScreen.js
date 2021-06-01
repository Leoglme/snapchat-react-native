import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import CircleCountdown from "../components/countdown/CircleCountdown";
import Constants from "expo-constants";
import snapTheme from "../components/theme";
import AppIcon from "../components/AppIcon";
import axios from "axios";
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
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    closeBtn: {
        padding: 2,
        position: 'absolute',
        top: Constants.statusBarHeight,
    }
});
function ReceiveSnapScreen(props) {
    const receiveSnap = props.route.params !== undefined ? props.route.params.ReceiveSnap : null;
    const snapId = props.route.params !== undefined ? props.route.params.snapId : null;
    const snap_duration = props.route.params !== undefined ? props.route.params.snap_duration : null;

    function CloseSnap(){
        axios.put('https://snapitech.herokuapp.com/snap/' + snapId)
            .then(response => console.log(response.data.snap))
            .then(err => console.log(err))
        props.navigation.navigate('BottomNavScreen');
    }

    console.log(snap_duration);
    return (<>
        <View style={styles.container}>
            <ImageBackground source={receiveSnap} style={styles.image}>
                <View style={{position: 'absolute', top: Constants.statusBarHeight, right: 8}}>
                    <CircleCountdown onComplete={CloseSnap} strokeWidth={2}
                                     backgroundColor={'rgba(0,0,0,.5)'}
                                     trailColor={'#787e7e'}
                                     circleColor={snapTheme.lightColor}
                                     countDownColor={snapTheme.lightColor}
                                     fontSize={16}
                                     size={40}
                                     duration={parseInt(snap_duration)}
                    />
                </View>
                <View style={styles.closeBtn}>
                    <AppIcon IonName={'close'} size={30} color={snapTheme.lightColor} onPress={CloseSnap}/>
                </View>
            </ImageBackground>
        </View>
    </>);
}

export default ReceiveSnapScreen;
