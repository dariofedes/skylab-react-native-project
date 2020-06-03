import React from 'react'
import { Text } from 'react-native'

import TextStyles from './styles'

const $Text = ({ children, onPress = null, style = {}, type = 'default' }) => {
    return (
        <Text
            onPress={onPress}
            style={{ ...TextStyles[type], ...style }}
        >{children}</Text>
    )
}

export default $Text