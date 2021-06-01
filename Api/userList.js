import React, {Component, useRef} from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Image, Dimensions,
    ActivityIndicator, Platform, Alert, Modal
} from "react-native";
import snapTheme from "../app/components/theme";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Constants from "expo-constants";
import libmoji from "libmoji";
import axios from "axios";
import * as Notifications from 'expo-notifications';
const avatarWidth = 70;
const styles = StyleSheet.create({
    itemStyle: {
        padding: 15
    },
    textInputStyle: {
        flex: 1,
        height: 50,
        fontSize: 25,
        margin: 5,
        color: snapTheme.lightColor
    },
    searchContainer: {
        position: 'absolute',
        right: 10,
        top: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '85%'
    },
    container: {
        padding: 10,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        width: '85%',
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
    },
    userContainer: {
        top: Constants.statusBarHeight + 20,
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 15
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    },
    footer: {
        height: Constants.statusBarHeight + 40,
        width: '100%',
        backgroundColor: snapTheme.chatColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    footer_sendBtn: {
        backgroundColor: snapTheme.lightColor,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
    },
    footer_sender: {
        width: '90%',
        color: snapTheme.lightColor,
        fontSize: 18,
        fontFamily: 'Lato_700Bold'
    }
})

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            users: [],
            search: "",
            currentPage: 1,
            perPage: 10,
            isLoading: false,
            modal: false,
            sender: null
        }
    }

    componentDidMount() {
        this.setState({isLoading: true}, this.fetchUser)
    }

    paginate(array, perPage, currentPage) {
        return array.slice((currentPage - 1) * perPage, currentPage * perPage);
    }

    fetchUser = async () => {
        const token = await AsyncStorage.getItem('UserToken')
        const toto = await AsyncStorage.getItem('UserEmail')
        console.log("TOKEN", token);
        console.log("UserEmail", toto);
        let config = {
            headers: {
                token: token,
            }
        }
        fetch('https://snapi-wac.herokuapp.com/all', config)
            .then((response) => response.json())
            .then((responseJson) => {
                const data = responseJson.data;
                const paginateResult = this.paginate(data, this.state.perPage, this.state.currentPage)
                this.setState({
                    data: paginateResult,
                    users: data,
                    isLoading: false
                })
            })
            .catch((error) => console.error(error))
    }

    renderBitmoji() {
        let gender = libmoji.genders[libmoji.randInt(2)];
        let style = libmoji.styles[libmoji.randInt(3)];
        let traits = libmoji.randTraits(libmoji.getTraits(gender[0], style[0]));
        let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));
        return libmoji.buildPreviewUrl("head", 1, gender[1], style[1], 0, traits, outfit);
    }

    /*Image upload*/
    async postSnap(image, sender) {
        const token = await AsyncStorage.getItem('UserToken')
        const data = {
            duration: this.props.duration,
            to: sender,
        }
        await axios.post('https://snapi-wac.herokuapp.com/snap', data, {
            headers: {token: token}
        }).then(response => {
            console.log("postSnaps response : " + response.data.data)
            this.saveImage(image, sender);
        }).catch(error => console.log("postSnap error : " + error))
    }

    async saveImage(image, sender) {
        const email = await AsyncStorage.getItem('UserEmail')
        const data = {
            sender: email,
            receiver: sender,
            snap_image: image,
            snap_duration: this.props.duration
        }
        axios.post('https://snapitech.herokuapp.com/api/upload', data)
            .then(response => {
                console.log("saveImage response : " + response)
                console.log("image upload !!! :)")
            })
            .catch(error => {
                console.log("saveImage error : " + error.success)
            })
    }

    showFooter(sender){
        this.setState({modal: true, sender: sender})
    }

    async send(snapImage, duration, sender) {
        console.log(snapImage.uri);
        const data = new FormData()
        const apiUrl = 'https://api.imgur.com/3/image';
        const apiKey = 'dc6e79e2ed95c6b';

        data.append('image', {
            name: '49db-8078-2ddd79bca0d7dddd20.jpg',
            type: 'images/jpg',
            uri: snapImage.uri
        })
        console.log(data);
        this.props.navigation.navigate('BottomNavScreen');
        await Notifications.scheduleNotificationAsync({
            content: {
                body: 'Your snap has been sent to ' + sender + ' 👻',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
        fetch(apiUrl, {
            method: "post",
            body: data,
            headers: {
                Authorization: 'Client-ID ' + apiKey,
                Accept: 'application/json',
            },
            mimeType: 'multipart/form-data',
            async: false,
            crossDomain: true,
            processData: false,
            contentType: false,
        }).then(res => res.json()).then(data => {
            console.log(data.data.link);
            this.postSnap(data.data.link, sender);
        }).catch(err => {
            Alert.alert("An Error Occured While Uploading")
        })
    }
    ItemView = (item) => {
        const email = item.item.email;
        return (<>
            <SafeAreaView style={{width: '100%'}}>
                <TouchableOpacity style={styles.container}
                                  onPress={() => this.showFooter(email)}>
                    <View style={styles.contentContainer}>
                        <View style={styles.user}>
                            <View style={styles.iconContainer}>
                                <Image style={styles.bitmoji} source={{uri: this.renderBitmoji()}}/>
                            </View>
                            <View style={{width: Dimensions.get('window').width - avatarWidth}}>
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>{email}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>)
    }

    ItemSeparatorView = () => {
        return (
            <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}/>
        )
    }

    searchFilter = (text) => {
        if (text) {
            const newData = this.state.users.filter((user) => {
                const userData = user.email ? user.email.toLowerCase() : ''.toLowerCase();
                const TextData = text.toLowerCase();
                return userData.indexOf(TextData) > -1;
            });
            this.setState({
                data: this.paginate(newData, this.state.perPage, this.state.currentPage),
                search: text,
                isLoading: false
            })
        } else {
            this.setState({
                data: this.state.users,
                search: text
            })
        }
    }

    renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator size={'large'}/>
                </View> : null
        )
    }

    showMore = () => {
        const isSearch = this.state.search.length > 0;
        if (!isSearch) {
            this.setState({perPage: this.state.perPage + 1, isLoading: true}, this.fetchUser)
        }
        this.setState({perPage: this.state.perPage + 1, isLoading: true})
        this.searchFilter(this.state.search)
    }

    render() {
        return (<>
            <SafeAreaView style={{flex: 1}}>
                {this.props.searchBar && <View style={styles.searchContainer}>
                    <AntDesign name="search1" size={24} color={snapTheme.lightColor} style={{paddingRight: 8}}/>
                    <TextInput
                        style={styles.textInputStyle}
                        value={this.state.search}
                        placeholder={'Send to...'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.searchFilter(text)}
                        placeholderTextColor="#737077"
                    />
                </View>}
                <FlatList
                    style={styles.userContainer}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.ItemSeparatorView}
                    renderItem={this.ItemView}
                    onEndReached={this.showMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={this.renderFooter}
                />
            </SafeAreaView>
            {this.state.modal &&
                <View style={styles.footer}>
                    <Text style={styles.footer_sender} numberOfLines={1} ellipsizeMode={'tail'}>
                        {this.state.sender}
                    </Text>
                    <TouchableOpacity style={styles.footer_sendBtn}
                                      onPress={() =>
                                          this.send(this.props.snapImage, this.props.duration, this.state.sender)
                                      }>
                        <Ionicons name="send" size={24} color={snapTheme.chatColor} style={{paddingLeft: 5}} />
                    </TouchableOpacity>
                </View>
            }
        </>)
    }
}

export default UserList;
