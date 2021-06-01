import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import snapTheme from "../components/theme";

const styles = StyleSheet.create({
    containerStories: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: snapTheme.thirdColor
    }
})

function StoriesScreen(props) {
    return (<>
        <View style={styles.containerStories}>
            <Text>Stories</Text>
        </View>
    </>);
}

export default StoriesScreen;
