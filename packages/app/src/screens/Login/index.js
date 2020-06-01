import React, { useState } from 'react'
import {
    View,
    Image,
    KeyboardAvoidingView,
} from 'react-native'
import styles from './styles'

import Input from '../../components/commons/input'
import Button from '../../components/commons/button'
import Text from '../../components/commons/text'
import Link from '../../components/formLink'

const ICON_URL = 'https://cdn.pixabay.com/photo/2017/10/25/12/33/rocket-2887845_1280.png'

export default function Login({ goToRegister, onSubmit }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="position"
        >
            <Image 
                style={styles.icon} 
                source={{ uri:ICON_URL }} 
            />
            <Text type='title'>Sign in</Text>

            <View style={styles.formContainer}>
                <Input 
                    placeholder="email"
                    type="email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />

                <Input
                    placeholder="password"
                    type='password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Button
                    onPress={() => onSubmit(email, password)}
                    text='Submit'
                />
            </View>

            <Link onPress={goToRegister} type='login'/>
        </KeyboardAvoidingView>
    )
}