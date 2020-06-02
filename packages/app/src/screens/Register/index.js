import React, { useState } from 'react'
import {
    View,
    Image,
    KeyboardAvoidingView,
} from 'react-native'
import registerUser from '@skylab/client-logic/src/users/register-user';

import styles from './styles'
import Input from '../../components/commons/input'
import Button from '../../components/commons/button'
import Text from '../../components/commons/text'
import Link from '../../components/formLink'

const ICON_URL = 'https://cdn.pixabay.com/photo/2017/10/25/12/33/rocket-2887845_1280.png'

export default function Register(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async () => {
        await registerUser(email, username, password)

        props.navigation.navigate('Login', { email })
    }

    const goToLogin = () => {
        props.navigation.navigate('Login')
    }
    
    const { backgroundColor } = props
    
    return (
        <KeyboardAvoidingView 
            style={[ styles.container, { backgroundColor } ]} 
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
                    placeholder="username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    type='username'
                />
                <Input
                    placeholder="password"
                    type='password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Button
                    onPress={onSubmit}
                    text='Submit'
                />
            </View>

            <Link onPress={goToLogin} type='register'/>
        </KeyboardAvoidingView>
    )
}