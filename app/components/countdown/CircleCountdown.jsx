import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from "react-native";


const styles = StyleSheet.create({
    countDownContainer: {
        borderRadius: 100
    }
})


function CircleCountdown({onComplete, circleColor, backgroundColor, countDownColor, strokeWidth, trailColor, fontSize, duration, size}) {

    const fadeAnim = useState(new Animated.Value(1))[0]
    const [display, setDisplay] = useState(false);
    const fadeDelay = parseInt(duration) * 1200 + 5000;
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: fadeDelay,
                useNativeDriver: true
            }
        ).start(() => {setDisplay(true)});
    }, [fadeAnim])

    const UrgeWithPleasureComponent = () => (
        <Animated.View style={[styles.countDownContainer, {backgroundColor: backgroundColor, width: size, opacity: fadeAnim}]}>
            <CountdownCircleTimer
                onComplete={onComplete}
                isPlaying
                duration={duration}
                colors={circleColor}
                strokeWidth={strokeWidth}
                trailColor={trailColor}
                size={size}
            >
                {({ remainingTime, animatedColor }) => (
                    <Animated.Text style={{ color: countDownColor, fontSize: fontSize, fontWeight: 'bold'}}>
                        {remainingTime}
                    </Animated.Text>
                )}
            </CountdownCircleTimer>
        </Animated.View>

    )
    return (
        <UrgeWithPleasureComponent/>
    );
}

export default CircleCountdown;
