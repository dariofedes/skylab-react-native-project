import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native'
import authenticateUser from '@skylab/client-logic/src/users/authenticate-user';

import styles from './styles'
import Input from '../../components/commons/Input'
import Button from '../../components/commons/Button'
import Text from '../../components/commons/Text'
import Link from '../../components/FormLink'

const ICON_URL = 'https://cdn.pixabay.com/photo/2017/10/25/12/33/rocket-2887845_1280.png'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const { params } = props.route

        params && setEmail(params.email)
    }, [])

    const onSubmit = async () => {
        const { token } = await authenticateUser(email, password)

        await AsyncStorage.setItem('token', token)

        props.navigation.navigate('Home', { email })
    }

    const goToRegister = () => {
        const canGoBack = props.navigation.canGoBack()
        
        canGoBack && props.navigation.goBack()
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

            <Link onPress={goToRegister} type='login'/>
        </KeyboardAvoidingView>
    )
}