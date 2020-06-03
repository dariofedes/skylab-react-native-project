import React from 'react'
import { TouchableOpacity } from 'react-native'

import Text from '../text'
import styles from './styles'

const Button = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button