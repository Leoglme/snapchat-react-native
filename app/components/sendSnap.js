import React, {Component, useCallback, useEffect, useRef, useState} from 'react'
import {StyleSheet, Text, View, Image, Button, Alert, Platform} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {Camera} from "expo-camera";
import axios from "axios";

export default class sendSnap extends React.Component {

    constructor(props) {
        super(props);
        this.duration = props.duration;
        this.snapImage = props.snapImage;
        this.sender = props.sender;
    }


    componentDidMount() {
        this.send();
    }

    async postSnap(image) {
        const data = {
            duration: this.duration,
            to: this.sender,
        }
        await axios.post('https://snapi-wac.herokuapp.com/snap', data, {
            headers: {token: "cYVA3WVuD19bNiVTS8jhEk6h"}
        }).then(response => {
            console.log("postSnaps response : " + response.data.data)
            this.getAllSnaps(image);
        }).catch(error => console.log("postSnap error : " + error))
    }


    async getAllSnaps(image) {
        axios.get('https://snapi-wac.herokuapp.com/snaps', {
            headers: {token: "cYVA3WVuD19bNiVTS8jhEk6h"}
        }).then(response => {
            console.log("getAllSnaps response : " + JSON.stringify(response.data.data))
            this.lastSnapGestion(response.data, image);
        })
            .catch(error => console.log("getAllSnaps error : " + error))
    }

    lastSnapGestion(response, image) {
        const byId = response.data.slice(0);
        byId.sort(function (a, b) {
            return a.snap_id - b.snap_id;
        });
        const lastSnapId = byId.slice(-1).pop().snap_id;
        this.saveImage(lastSnapId, image);
    }

    saveImage(snapId, image) {
        const data = {
            id_snap: snapId,
            snap_image: image,
            snap_duration: this.duration
        }
        axios.post('https://snapitech.herokuapp.com/api/upload', data)
            .then(response => {
                console.log("saveImage response : " + response)
                return [{data: data}]
            })
            .catch(error => {
                console.log("saveImage error : " + error.success)
                return error.success;
            })
    }

    send() {
        const data = new FormData()
        data.append('file', {
            name: '49db-8078-2ddd79bca0d720.jpg',
            type: 'images/jpg',
            uri:
                Platform.OS === 'android' ? this.snapImage.uri : this.snapImage.uri.replace('file://', ''),
        })
        data.append('upload_preset', 'snapitech')
        data.append("cloud_name", "dibodev")
        fetch("https://api.cloudinary.com/v1_1/dibodev/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {
            console.log(data.secure_url);
            this.postSnap(data.secure_url).then(r => '');
        }).catch(err => {
            Alert.alert("An Error Occured While Uploading")
        })
    }
}
