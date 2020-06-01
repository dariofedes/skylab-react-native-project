import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import Text from '../commons/text'

const Link = ({ onPress,  type = 'login' }) => {
    if (type === 'login') {
        return (
            <View style={styles.haveAccount}>
                <Text>You don't have an account yet?</Text>
                <Text style={styles.link} onPress={onPress}>Go to Register!</Text>
            </View>
        )
    }

    return (
        <View style={styles.haveAccount}>
            <Text>Already have an account?</Text>
            <Text style={styles.link} onPress={onPress} >Log in!</Text>
        </View>
    )
}

export default Link