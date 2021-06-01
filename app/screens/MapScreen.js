import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import snapTheme from "../components/theme";

const styles = StyleSheet.create({
    containerMap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: snapTheme.primaryColor
    }
})

function MapScreen(props) {
    return (<>
        <View style={styles.containerMap}>
            <Text>Map</Text>
        </View>
    </>);
}

export default MapScreen;
