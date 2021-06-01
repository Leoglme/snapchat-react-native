import React, {useState} from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import {Alert} from "react-native-web";
import styles from './styles';


function Home() {
    return (<>
        {/*<CameraScreen/>*/}
        <View style={styles.MyStyle}>
            <Button
                title="Sign Up"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
            <Button
                title="Register"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View>
    </>)
}



export default Home;
