import React, { useState } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { getKeyboardType } from '../../../utils/Device'
import styles from './styles'

const Input = ({ placeholder, onChangeText, value, type }) => {
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

Input.propTypes = {
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string
}

Input.defaultProps = {
    placeholder: 'Type here...',
    type: 'default'
}

export default Input