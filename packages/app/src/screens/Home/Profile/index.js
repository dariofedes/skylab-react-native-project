import React, { useState } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Avatar } from 'react-native-elements'
import { showImagePicker } from '@skylab/services/src/ImagePicker'
import { CommonActions } from '@react-navigation/native';

import Text from '../../../components/commons/text'
import Button from '../../../components/commons/button'

export default function Profile(props) {
    const [image, setImage] = useState()

    function onPickedImage(pickedImage) {
        setImage(pickedImage)
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')

        props.navigation.dispatch(
            CommonActions.reset({
                index: 0, 
                routes: [{ name: 'Register' }]
            })
        );
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 50 }}>Profile</Text>
            <Button text="Pick a photo" onPress={() => {
                showImagePicker(onPickedImage)
            }} />
            <Avatar 
                source={image}
                rounded 
                size="large" 
                title="DF" 
                overlayContainerStyle={{backgroundColor: 'blue'}}
            />
            <Button
                onPress={logout}
                text='Logout'
            />
        </View>
    )
}