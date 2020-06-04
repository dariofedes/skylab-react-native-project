import React from 'react'
import { View } from 'react-native'

import Text from '../../../components/commons/Text'

export default function Posts() {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text type='title' style={{ color: 'purple' }}>Posts</Text>
        </View>
    )
}