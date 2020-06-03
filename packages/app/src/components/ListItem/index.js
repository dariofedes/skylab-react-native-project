import { View } from 'react-native'

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
 
export const ListItem = (item) => {
    return <View style={styles.listItem}>
        <Text type='subtitle'>{item.full_name}</Text>
        <BadgeLabel icon='map-pin' text={item.location.name} iconColor='purple'/>
        <BadgeLabel icon='map-pin' text={item.status} iconColor={getColorFromStatus(item.statue)}/>
    </View>
}

export default ListItem