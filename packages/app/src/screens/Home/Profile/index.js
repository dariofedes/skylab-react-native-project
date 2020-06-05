import React, { useState, useContext } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Avatar } from 'react-native-elements'
import { hasNotch } from 'react-native-device-info'
import { showImagePicker } from '@skylab/services/src/ImagePicker'
import { CommonActions } from '@react-navigation/native';
import { Context } from '../../../components/ContextProvider'
import Text from '../../../components/commons/Text'
import Button from '../../../components/commons/Button'

export default function Profile(props) {
    const [state, setState] = useContext(Context)
    const [image, setImage] = useState()
    const [battery, setBattery] = useState('')

    function onPickedImage(pickedImage) {
        setImage(pickedImage)
    }

    async function handleOnLanguageSelection(language) {
        setState({ language })

        await AsyncStorage.setItem('language', language)
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
            <Text type='title' style={{ color: 'purple' }}>Profile</Text>
            <Button text="Get batery level" onPress={async () => {
                const response = await hasNotch()
                setBattery(response.toString())
            }} />
            <Text>{battery ? battery : ''}</Text>
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
            <Button text="English" onPress={() => handleOnLanguageSelection('en')}></Button>
            <Button text="Castellano" onPress={() => handleOnLanguageSelection('es')}></Button>
            <Button text="Euskera" onPress={() => handleOnLanguageSelection('eus')}></Button>
            <Button text="Catalá" onPress={() => handleOnLanguageSelection('cat')}></Button>
        </View>
    )
}