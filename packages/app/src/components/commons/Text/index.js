import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types';

import TextStyles from './styles'

const $Text = ({ children, onPress, style, type }) => {
    return (
        <Text
            onPress={onPress}
            style={{ ...TextStyles[type], ...style }}
        >{children}</Text>
    )
}

$Text.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.object,
    type: PropTypes.oneOf(['default', 'title', 'subtitle', 'link'])
}

$Text.defaultProps = {
    onPress: null,
    style: {},
    type: 'default'
}

export default $Text