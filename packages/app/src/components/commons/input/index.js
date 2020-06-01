import React from 'react'
import { TextInput } from 'react-native'
import styles from './styles'

import {getKeyboardType} from '../../../utils/Device'

const Input = ({ placeholder, onChangeText, value, type = 'default' }) => {
    const isSecure = type === 'password'

    return (
        <TextInput 
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor='#666'
            secureTextEntry={isSecure}
            value={value}
            onChangeText={onChangeText}
            keyboardType={getKeyboardType(type)}
        />
    )
}

export default Input