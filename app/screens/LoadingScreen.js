import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from "react-native";
import snapTheme from "../components/theme";


class LoadingScreen extends Component {


    componentDidMount() {
        const ReceiveSnap = this.props.route.params !== undefined ? this.props.route.params.ReceiveSnap : null;
        const snapId = this.props.route.params !== undefined ? this.props.route.params.snapId : null;
        const snap_duration = this.props.route.params !== undefined ? this.props.route.params.snap_duration : null;
        setTimeout(() => {
            this.props.navigation.navigate('ReceiveSnapScreen', {ReceiveSnap: ReceiveSnap, snapId: snapId, snap_duration: snap_duration});
        },1000)
    }
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
                        autoPlay loop
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

export default LoadingScreen;
