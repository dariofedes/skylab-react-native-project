import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import styles from './styles'

export default function Register({ onToLogin, onSubmit }) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    return (
    <SafeAreaView style={{flex: 1 }}>
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="position"
        >
            <Text style={styles.title}>Sign in</Text>
            <Image 
                style={styles.icon} 
                source={{uri: 'https://cdn.pixabay.com/photo/2017/10/25/12/33/rocket-2887845_1280.png'}} 
            />

            <View style={styles.formContainer}>
                <TextInput style={styles.input}
                    placeholder="email"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput style={styles.input}
                    placeholder="username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <TextInput style={styles.input}
                    placeholder="password"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>

            <TouchableOpacity style={styles.button}
            onPress={() => onSubmit(email, username, password)}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            
            <View style={styles.haveAccount}>
                <Text style={styles.text}>Already have an account? </Text>
                <Text style={styles.link} onPress={() => onToLogin()} >Log in!</Text>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>)
}