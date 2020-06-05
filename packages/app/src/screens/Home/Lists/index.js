import React, { useState, useEffect } from 'react'
import { View, Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import DateTimePicker from '@react-native-community/datetimepicker';


import Text from '../../../components/commons/Text'
import Button from '../../../components/commons/Button'


export default function Lists({ navigation, route }) {
    const [date, setDate] = useState(0)


    const [ showPicker, setShowPicker ] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', (e) => {
            // cuando se entra en la pantalla
             console.log('hello! i am focused!', e)
        });

        const unsubscribe2 = navigation.addListener('blur', (e) => {
            // cuando se va de la pantalla
            console.log('hello! i am blurred!', e)
        });

        console.log('navigation => ', navigation, route)

        // const unsubscribePress = navigation.addListener('tabPress', e => {
        //     // Prevent default action
        //     e.preventDefault();

        //     Alert.alert('Hello!', 'Are you sure?', [
        //         {
        //           text: "Cancel",
        //           onPress: () => console.log("Cancel Pressed"),
        //           style: "cancel"
        //         },
        //         { text: "Yes, i'm sure!", onPress: () => navigation.navigate('Lists') }
        //     ])
        //   });
    
        return () => {
            unsubscribe()
            unsubscribe2()
            // unsubscribePress()
        }
      }, [navigation]);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text type='title' style={{ color: 'purple' }}>Lists</Text>

            {/* <Agenda style={{ width: '100%' }}
            items={{
                '2020-05-22': [{name: 'launch'}],
                '2020-05-23': [{name: 'landing'}],
                '2020-05-25': [{name: 'test'}, {name: 'landing'}]
            }}
            renderItem={(item) => <Text>{item.name}</Text>}
            /> */}

            <Button text="Show picker" onPress={() => setShowPicker(true)} />
            {showPicker && <DateTimePicker
            testID="dateTimePicker"
            value={new Date('2020-06-04')}
            is24Hour={true}
            display="default"
            onChange={(date) => {
                console.log(date)
                setDate(date.nativeEvent.timestamp)
                setShowPicker(false)
            }}
             />}

       {date ? <Text>{date}</Text> : null}
        </View>
    )
}