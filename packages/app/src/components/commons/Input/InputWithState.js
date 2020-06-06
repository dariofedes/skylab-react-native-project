import React, { useState } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { getKeyboardType } from '../../../utils/Device'
import styles from './styles'


// To test onChangeText method

const Input = ({ placeholder, type }) => {
    const isSecure = type === 'password'

    const [value, setValue] = useState('')

    return (
        <TextInput 
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor='#666'
            secureTextEntry={isSecure}
            value={value}
            onChangeText={(v) => setValue(v)}
            keyboardType={getKeyboardType(type)}
        />
    )
}

Input.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string
}

Input.defaultProps = {
    placeholder: 'Type here...',
    type: 'default'
}

export default Input