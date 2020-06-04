import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Text from '../../../components/commons/Text'
import Dictionary from './dictionary'

const language = 'cat'

export default function Info() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text type='title' style={{ color: 'purple' }}>{Dictionary[language].title}</Text>

            <Text
                style={{ padding: 20, textAlign: 'center' }}
            >{Dictionary[language].description_one}</Text>

            <Text
                style={{ padding: 30, textAlign: 'center' }}
            >{Dictionary[language].description_two}</Text>
            
            <View style={{ marginTop: 30, marginBottom: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='mail' size={20} color='purple' />
                    <Text style={{ marginLeft: 10 }}>{Dictionary[language].email}: </Text>
                    <Text type='link'>example@email.com</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Icon name='phone' size={20} color='purple' />
                    <Text style={{ marginLeft: 10 }}>{Dictionary[language].phone}: </Text>
                    <Text type='link'>+34 123 456 789</Text>
                </View>
            </View>

            <Text type='subtitle'>{Dictionary[language].thanks}</Text>
        </View>
    )
}