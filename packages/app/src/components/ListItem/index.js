import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import Text from '../commons/Text'
import BadgeLabel from '../commons/BadgeLabel'
import styles from './styles'

const getColorFromStatus = status => {
    switch(status) {
        case 'active':
            return 'green'
        case 'retired': 
            return 'red'
        default: 
            return '#333'
    }
}
 
export const ListItem = ({ item, onPress }) => {
    if (!item) return null

    return <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Text type='subtitle'>{item.full_name}</Text>
        <BadgeLabel icon='map-pin' text={item.location.name} iconColor='purple'/>
        <BadgeLabel icon='check' text={item.status} iconColor={getColorFromStatus(item.statue)}/>
    </TouchableOpacity>
}

export default ListItem