import React, {Component} from 'react';
import {Alert, Button, TextInput, View, StyleSheet} from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from "axios";
import routes from '../../Constants/navigationStrings'
import ApiInfos from '../../../Api/ApiInfos'

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
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

    onSignup() {
        const {email, password} = this.state;
        const {navigation} = this.props;
        axios.post(ApiInfos.url + 'inscription', {
            email: email,
            password: password
        }).then(res => {
            if (res.status === 200) {
                navigation.navigate(routes.Login, {email, password});
            }else{
               alert('Erreur lors de la connexion, veuillez ressayer')
            }
        })
            .catch(err => console.log("ERROR", err))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={'email'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button
                    title={'Signup'}
                    style={styles.input}
                    onPress={this.onSignup.bind(this)}
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
