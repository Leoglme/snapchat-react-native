import React, {useEffect, useRef, useState} from 'react';
import {AsyncStorage, Platform, StyleSheet} from 'react-native';
import MapScreen from "../screens/MapScreen";
import ChatScreen from "../screens/ChatScreen";
import StoriesScreen from "../screens/StoriesScreen";
import CameraScreen from "../screens/CameraScreen";
import snapTheme from "../components/theme";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withNavigationFocus} from "react-navigation";
import {StatusBar} from "expo-status-bar";
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const styles = StyleSheet.create({
    bottomNav: {
        color: 'red'
    }
})

const Tab = createMaterialTopTabNavigator();

function BottomNavScreen(props) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    const icons = {
        Map: 'md-location-outline',
        Chat: 'ios-chatbox-outline',
        Camera: 'camera-outline',
        Users: 'people'
    }

    const customTabs = {
        Map: {
            color: snapTheme.localColor,
        },
        Chat: {
            color: snapTheme.chatColor,
        },
        Camera: {
            color: snapTheme.primaryColor,
        },
        Users: {
            color: snapTheme.storiesColor,
        }
    }
    return (<>
        <Tab.Navigator screenOptions={({route}) => {
            const color = customTabs[route.name].color;
            return {
                tabBarIcon: ({focused}) => {
                    const iconName = icons[route.name];
                    const focusedColor = focused ? color : snapTheme.lightColor;
                    return <Ionicons name={iconName} size={26} color={focusedColor}/>
                }
            }
        }}
                       tabBarPosition={'bottom'}
                       initialRouteName={'Camera'}
                       tabBarOptions={{
                           showIcon: true,
                           showLabel: false,
                           inactiveTintColor: '#fff',
                           activeTintColor: '#fff',
                           indicatorStyle: {backgroundColor: 'transparent'},
                           style: {
                               backgroundColor: '#000',
                               borderTopWidth: 0,
                           }
                       }}

        >
            <Tab.Screen name='Map' component={MapScreen}/>
            <Tab.Screen name='Chat' component={ChatScreen}/>
            <Tab.Screen name='Camera' component={CameraScreen}/>
            <Tab.Screen name='Users' component={StoriesScreen}/>
        </Tab.Navigator>
    </>);

}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        return;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}


export default BottomNavScreen;
