import React, { Component } from 'react';
import {TouchableOpacity} from "react-native-gesture-handler";
import { View, Text, StyleSheet } from 'react-native';
import navigationStrings from "../../Constants/navigationStrings";
import {ImageBackground} from "react-native";
import imagePath from "../../Constants/imagePath";
import {SafeAreaView} from "react-native";
import snapTheme from "../../../app/components/theme";


//create a component
const InitialScreen = ({ navigation }) => {
    const image = imagePath.Snap;
    const goToScreen = (screen) =>{
        navigation.navigate(screen)
    }
    return (<>
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <SafeAreaView style={{justifyContent: "center", alignItems: "center", height: '100%'}}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.btnStyle} onPress={() => goToScreen('Login')}>
                            <Text style={{color: 'white', }}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={styles.btnSignUp} onPress={() => goToScreen('Signup')}>
                            <Text style={{color: 'white'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    </>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    btnStyle: {
        backgroundColor: snapTheme.pinkColor,
        width: 1500,
        height: 90,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
      color: "white",
      fontFamily: "bold",
      fontSize: 26,
    },
    btnSignUp: {
        backgroundColor: '#45b0fbfc',
        width: 1500,
        height: 90,
        alignItems: "center",
        justifyContent: "center"
    },
    btnContainer: {
        height: '100%',
        justifyContent: "flex-end"
    }
})

export default InitialScreen;
