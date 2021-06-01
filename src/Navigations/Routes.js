import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import navigationStrings from "../Constants/navigationStrings";
import BottomNavScreen from "../../app/navigations/BottomNavScreen";
import {AsyncStorage} from "react-native";
import {Camera} from "expo-camera";
import {useCallback, useEffect, useState} from "react";
import ReceiveSnapScreen from "../../app/screens/ReceiveSnapScreen";
import Chats from "../../app/chats/chats";
import ChatScreen from "../../app/screens/ChatScreen";
import {StatusBar} from "expo-status-bar";
import ContactListScreen from "../../app/screens/ContactListScreen";
import LoadingScreen from "../../app/screens/LoadingScreen";
import {InitialScreen} from "../Screens";
import TimeScreen from "../../app/screens/TimeScreen";

const Stack = createStackNavigator();


export default function Routes() {

    const [userToken, setUserToken] = useState(null);

    const retrieveData = useCallback(async () => {
        try {
            const res = await AsyncStorage.getItem('UserToken')
            console.log("ROUTE", res);
            setUserToken(res)
        } catch (error) {
            console.log("erreur get token", error);
        }
    }, [setUserToken])

    useEffect(() => {
        retrieveData();
    }, [retrieveData]);


    return (<>
        <NavigationContainer>
            <Stack.Navigator>
                {!userToken && AuthStack(Stack)}
                {userToken && <Stack.Screen name={navigationStrings.BottomNavScreen} component={BottomNavScreen}
                                            options={{headerShown: false}}/>}
                <Stack.Screen name={navigationStrings.ReceiveSnapScreen} component={ReceiveSnapScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name={navigationStrings.LoadingScreen} component={LoadingScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name={navigationStrings.ContactListScreen} component={ContactListScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name={navigationStrings.ChatScreen} component={ChatScreen}
                              options={{headerShown: false}}/>
                <Stack.Screen name={'InitialScreen2'} component={InitialScreen} options={{headerShown: false}}/>
                <Stack.Screen name={'TimeScreen'} component={TimeScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    </>);
};

