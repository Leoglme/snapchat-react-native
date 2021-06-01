import React from 'react';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image, Dimensions} from "react-native";
import snapTheme from "../components/theme";
import Constants from "expo-constants";
import moment from 'moment';
import axios from "axios";
const avatarWidth = 70;
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        width: '80%',
        fontSize: 17,
        fontFamily: "Lato_700Bold",
        paddingTop: 10
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 45 / 2,
        marginRight: 10
    },
    newSnap: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: snapTheme.redColor,
        marginRight: 10,
        marginVertical: 5,
        position: 'absolute',
        right: 10,
        bottom: 5,
    },
    newSnapText: {
        color: '#9b9ba3',
        fontSize: 12,
        fontWeight: '600'
    },
    newContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    replyIcon: {
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: "#ccc"
    },
    bitmoji: {
        width: 45,
        height: 45,
        borderRadius: 100,
    },
    openedSnap: {
        paddingRight: 5
    }
})


function Chats({name, createdAt, updatedAt, newChat, bitmoji, navigation, ReceiveSnap, snapId, duration}) {
    const text = newChat ? 'Watch the snap - ' + moment.utc(createdAt).fromNow() : 'Opened ' + moment.utc(updatedAt).fromNow() + ' .';

    function OpenedSnap() {
        navigation.navigate('LoadingScreen', {ReceiveSnap: ReceiveSnap, snapId: snapId, snap_duration: duration})
    }

    return (<>
        <SafeAreaView style={{width: '100%'}}>
            <TouchableOpacity style={styles.container} onPress={() => {
                if (newChat) {
                    OpenedSnap()
                }
            }}>
                <View style={styles.contentContainer}>
                    <View style={styles.user}>
                        <View style={styles.iconContainer}>
                            <Image style={styles.bitmoji} source={{uri: bitmoji}}/>
                        </View>
                        <View style={{width: Dimensions.get('window').width - avatarWidth}}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>{name}</Text>
                            <View style={styles.newContainer}>
                                {!newChat && <Ionicons style={styles.openedSnap} name="send-outline" size={12}
                                                       color={snapTheme.redColor}/>}
                                <Text style={styles.newSnapText}>{text}</Text>
                                {newChat && <View style={styles.newSnap}/>}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    </>);
}

export default Chats;
