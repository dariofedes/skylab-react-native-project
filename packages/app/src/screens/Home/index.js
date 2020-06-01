import React from 'react'
import { View } from 'react-native'

import Button from '../../components/commons/button'
import Text from '../../components/commons/text'

export default function Home({ goBack }) {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Homee!!</Text>
            <Button
                onPress={goBack}
                text='Go Back'
            />
        </View>
    )
}