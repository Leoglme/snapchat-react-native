import React, {Component, useEffect, useState} from 'react';
import {AsyncStorage, FlatList, StyleSheet, View} from "react-native";
import snapTheme from "../components/theme";
import Chats from "../chats/chats";
import {userData} from "../components/Model/userModel";
import Constants from 'expo-constants';
import libmoji from "libmoji";
import {Camera} from "expo-camera";
import axios from "axios";
import {StatusBar} from "expo-status-bar";
import {Text} from "native-base";
import NotFound from "../components/NotFound";

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        marginTop: Constants.statusBarHeight + 10,
        width: '100%'
    },
    containerChat: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#f1f1f1"
    }
})

const STYLES = ['default', 'dark-content', 'light-content'];

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getAll();
        });
        this.getAll();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }


    async getAll() {
        const userEmail = await AsyncStorage.getItem('UserEmail')
        console.log("BONJOUR", userEmail);
        this.setState({isLoading: true})
        await axios.get('https://snapitech.herokuapp.com/snaps/' + userEmail).finally(() => this.setState({isLoading: false}))
            .then(response => {
                console.log(response.data.data)
                this.setState({
                    data: response.data.data
                })
            })
            .catch(err => console.log(err))
    }


    renderBitmoji() {
        let gender = libmoji.genders[libmoji.randInt(2)];
        let style = libmoji.styles[libmoji.randInt(3)];
        let traits = libmoji.randTraits(libmoji.getTraits(gender[0], style[0]));
        let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));
        return libmoji.buildPreviewUrl("head", 1, gender[1], style[1], 0, traits, outfit);
    }

    render() {
        const {isLoading} = this.state;
        return (<>
            <View style={styles.containerChat}>
                <FlatList style={styles.Screen} data={this.state.data} keyExtractor={(item) => item._id}
                          renderItem={({item}) =>
                              <Chats ReceiveSnap={{uri: item.snap_image}} navigation={this.props.navigation}
                                     timeAgo={item.time} name={item.sender} newChat={item.newChat}
                                     bitmoji={this.renderBitmoji()} createdAt={item.createdAt} updatedAt={item.updatedAt}
                                     snapId={item._id} duration={item.snap_duration}/>
                          }
                          ItemSeparatorComponent={() =>
                              <View style={styles.divider}/>
                          }
                          refreshing={isLoading}
                          onRefresh={this.getAll.bind(this)}
                />
            </View>

        </>);
    }
}

export default ChatScreen;
