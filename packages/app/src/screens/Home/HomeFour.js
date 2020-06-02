import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { CommonActions } from '@react-navigation/native';


import Text from '../../components/commons/text'
import Button from '../../components/commons/button'

export default function HomeFour(props) {
    const logout = async () => {
        await AsyncStorage.clear()

        /**
         * We will explain this tomorrow
         * 
         * It jumps from the bottom again back to the stack navigator (Register screen)
         * Reseting the navigation
         */
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0, 
                routes: [{ name: 'Register' }]
            })
        );
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 50 }}>HomeFour</Text>
            <Button
                onPress={logout}
                text='Logout'
            />
        </View>
    )
}