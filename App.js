import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage} from 'react-native';
import Routes from "./src/Navigations/Routes";
import {useFonts as useLatoFont, Lato_700Bold} from '@expo-google-fonts/lato'
import {useFonts as useRobotoFont, Roboto_700Bold} from '@expo-google-fonts/roboto'
import TimeScreen from "./app/screens/TimeScreen";
import NotificationScreen from "./app/screens/NotificationScreen";

function App() {
    const [LatoFont] = useLatoFont({Lato_700Bold})
    const [RobotoFont] = useRobotoFont({Roboto_700Bold})

    if (!RobotoFont) {
        return null;
    }
    if (!LatoFont) {
        return null;
    }
    return (<>
        <View style={{flex: 1}}>
            <Routes />
        </View>
    </>)
}

export default App;
