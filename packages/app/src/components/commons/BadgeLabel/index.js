import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Text from '../Text'

const BadgeLabel = ({ icon, text, iconColor = '#333' }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Icon name={icon} size={20} color={iconColor}/>
            <Text style={{ paddingLeft: 10 }}>{text}</Text>
        </View>
    )
}

export default BadgeLabel