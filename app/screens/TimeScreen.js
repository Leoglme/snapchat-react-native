import * as React from 'react';
import {
    Vibration,
    StatusBar,
    Easing,
    TextInput,
    Dimensions,
    Animated,
    TouchableOpacity,
    FlatList,
    Text,
    View,
    StyleSheet, ImageBackground,
} from 'react-native';
import {useState} from "react";
import AppIcon from "../components/AppIcon";
import snapTheme from "../components/theme";

const {width, height} = Dimensions.get('window');
// 323F4E
const colors = {
    black: '#323F4E',
    red: '#F76A6A',
    text: '#ffffff',
};

const timers = [...Array(10).keys()].map((i) => (i === 0 ? 1 : i + 1));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function TimeScreen(props) {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [duration, setDuration] = useState(timers[0]);

    return (<View style={[styles.container, {backgroundColor: colors.black}]}>

        <StatusBar hidden/>
        <View style={styles.closeBtn}>
            <AppIcon IonName={'close'} size={30} color={snapTheme.lightColor} onPress={props.onClose}/>
        </View>
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 100,
                },
            ]}>
        </Animated.View>
        <View
            style={{
                position: 'absolute',
                top: height / 3,
                left: 0,
                right: 0,
                flex: 1,
            }}>
            <FlatList
                data={timers}
                keyExtractor={item => item.toString()}
                horizontal
                bounces={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                onMomentumScrollEnd={ev => {
                    const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE)
                    setDuration(timers[index]);
                    props.durationSet(timers[index])
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_SIZE}
                decelerationRate='fast'
                style={{flexGrow: 0}}
                contentContainerStyle={{
                    paddingHorizontal: ITEM_SPACING
                }}
                renderItem={({item, index}) => {
                    const inputRange = [
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                        (index + 1) * ITEM_SIZE
                    ]
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [.4, 1, .4]
                    })
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [.7, 1, .7]
                    })
                    return <View
                        style={{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                        <Animated.Text style={[styles.text, {
                            opacity,
                            transform: [{
                                scale
                            }]
                        }]}>
                            {item}
                        </Animated.Text>
                    </View>
                }}
            />
        </View>
    </View>)

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    roundButton: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: colors.red,
    },
    text: {
        fontSize: ITEM_SIZE * 0.8,
        fontFamily: "Lato_700Bold",
        color: colors.text,
        fontWeight: '900',
    },
    closeBtn: {
        padding: 2,
        position: 'absolute',
        zIndex: 999,
        top: 15,
    },
});
