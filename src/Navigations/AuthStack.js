import React from 'react';
import navigationStrings from '../Constants/navigationStrings';

import {
    InitialScreen,
    Login,
    Signup
} from "../Screens";
import BottomNavScreen from "../../app/navigations/BottomNavScreen";


export default function (Stack) {
    return (<>
        <Stack.Screen name={navigationStrings.InitialScreen} component={InitialScreen} options={{headerShown: false}}/>
        <Stack.Screen name={navigationStrings.SIGNUP} component={Signup} options={{headersShown: true}}/>
        <Stack.Screen name={navigationStrings.Login} component={Login} options={{headersShown: true}}/>
        <Stack.Screen name={'BottomNavScreen2'} component={BottomNavScreen} options={{headerShown: false}}/>
    </>)
}
