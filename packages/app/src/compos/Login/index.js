import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'

import styles from './styles'


/**
 * email and password
 */
export default function Login() {
    function onSubmit() {
        console.log()
    }

    return (
    <SafeAreaView style={{flex: 1 }}>
        <View style={styles.container}>
            <Text style={styles.title}>Log in</Text>
            <Image style={styles.icon} source={{uri: 'https://cdn.pixabay.com/photo/2017/10/25/12/33/rocket-2887845_1280.png'}} />
            <View style={styles.formContainer}>
                <TextInput style={styles.input}
                    placeholder="email"
                    keyboardType="email-address"
                />
                <TextInput style={styles.input}
                    placeholder="username"
                />
                <TextInput style={styles.input}
                    placeholder="password"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.haveAccount}>
                <Text style={styles.text}>Already have an account? </Text>
                <Text style={styles.link}>Log in!</Text>
            </View>
        </View>
    </SafeAreaView>)
}