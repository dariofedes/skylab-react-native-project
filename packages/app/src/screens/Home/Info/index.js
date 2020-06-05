import React, { useContext } from 'react'
import { ScrollView, View, Linking, Platform  } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import RNOpenMaps from 'react-native-open-maps';

import { Context } from '../../../components/ContextProvider'
import Text from '../../../components/commons/Text'
import Dictionary from './dictionary'

export default function Info() {
    const [ state, setState ] = useContext(Context)
    const { language } = state

    const email = 'example@email.com'
    const subject = 'React Native Course'
    const text = 'Hello!'

    const direction = 'Parallel, Barcelona'
    const phone = '+34 123 456 789'
    const url = 'https://reactnative.dev/docs/linking'

    const openSettings = async () => {
        await Linking.openSettings();
    }

    const openEmail = () => {
        Linking.openURL(`mailto:${email}?subject=${subject}&body=${text}`)
    }

    const openPhone = () => {
        Linking.openURL(`tel:${phone}`)
    }

    const openUrl = () => {
        Linking.openURL(url)
    }

    const openMap = () => {
        const provider = Platform.OS === 'ios' ? 'apple' : 'google'

        RNOpenMaps({
            provider,
            query: direction,
            travelType: 'walk',
            start: direction,
            end: 'Plaza Espanya, Barcelona',
            navigate_mode: 'navigate'
        })
    }

    return (
        <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                    <Text type='link' onPress={openEmail}>{email}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Icon name='phone' size={20} color='purple' />
                    <Text style={{ marginLeft: 10 }}>{Dictionary[language].phone}: </Text>
                    <Text type='link' onPress={openPhone}>{phone}</Text>
                </View>


                <Text type='link' onPress={openUrl}>{url}</Text>

                <Text type='link' onPress={openSettings}>Open Settings</Text>

                <Text type='link' onPress={openMap}>{direction}</Text>
            </View>

            <Text type='subtitle'>{Dictionary[language].thanks}</Text>
        </ScrollView>
    )
}