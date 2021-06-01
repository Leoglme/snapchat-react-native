import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from "react-native";
import snapTheme from "../components/theme";


class Splashscreen extends Component {
    render() {
        return (<>
            <View style={styles.container}>
                <View style={styles.animationContainer}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={{
                            width: 150,
                            height: 150,
                            position: 'absolute'
                        }}
                        source={require('./assets/49411-snapchat-icon.json')}
                        autoPlay loop={false} speed={0.5}
                    />
                </View>
            </View>

        </>);
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    container: {
        backgroundColor: snapTheme.lightColor,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        paddingTop: 20,
    },
});

export default Splashscreen;
