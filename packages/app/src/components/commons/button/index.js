import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './styles'
import Text from '../text'

const Button = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button