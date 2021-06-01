import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import NativeAsyncStorage from "react-native/Libraries/Storage/NativeAsyncStorage";
import { AsyncStorage } from 'react-native';
import {FacingModeToCameraType as response} from "expo-camera/src/WebConstants";
import routes from '../../Constants/navigationStrings'
import ApiInfos from '../../../Api/ApiInfos'
import axios from "axios";
export default class Login extends Component {
    constructor(props) {
        super(props);
        let toto = false;
        if(this.props.route.params){
            const {email, password} = this.props.route.params;
            if(email && password){
                this.state = {
                    email,
                    password,
                };
                toto = true;
                this.onLogin();
            }
        }
        if(!toto){
            this.state = {
                email: "",
                password: "",
            };
        }
    }
    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        let value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('Profile')
        }
    }

    onLogin() {
        const { email, password } = this.state;
        const { navigation } = this.props;
        axios.post(ApiInfos.url + 'connection', {
            email,
            password
        }).then(res => {
            AsyncStorage.setItem('UserToken', res.data.data.token);
            AsyncStorage.setItem('UserEmail', email);
            navigation.navigate('BottomNavScreen2');
        }).catch(err => console.log(err))
    }

    render() {
        const {email, password} = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    value={email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'email'}
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <Button
                    title={'Login'}
                    style={styles.input}
                    onPress={this.onLogin.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});
