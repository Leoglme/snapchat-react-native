import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from "react-native";
import {AntDesign, Ionicons} from '@expo/vector-icons';


const styles = StyleSheet.create({
    icon: {
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
})


function AppIcon({AntName, IonName, style, color, size, onPress}) {
    return (<>
        <TouchableOpacity style={[styles.icon, {...style}]} onPress={onPress}>
            {AntName && <AntDesign name={AntName} size={size} color={color}/>}
            {IonName && <Ionicons name={IonName} size={size} color={color}/>}
        </TouchableOpacity>
    </>);
}

export default AppIcon;
