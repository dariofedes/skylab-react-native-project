import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

import Message from './Message'
import EXAMPLE_MESSAGES from './Data'

export default function Chat(props) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages(EXAMPLE_MESSAGES)

        props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('#73b9ff', true)
            StatusBar.setBarStyle('dark-content', true)
        })

        props.navigation.addListener('blur', () => {
            StatusBar.setBackgroundColor('#ebbf47', true)
            StatusBar.setBarStyle('light-content', true)
        })
    }, [])
    

    const onSend = (newMessages = []) => {
        setMessages(
            GiftedChat.append(messages, newMessages)
        )
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: 'Maider',
                avatar: 'https://placeimg.com/140/140/any',
            }}
            renderMessage={(props) => {
                console.log(props.currentMessage, props.nextMessage, props.previousMessage)
                return (
                    <Message {...props} messageTextStyle={{ fontSize: 16 }} />
                )
            }}
        />
    )
}