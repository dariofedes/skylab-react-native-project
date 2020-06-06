import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import Message from './Message'
import EXAMPLE_MESSAGES from './Data'

export default function Chat(props) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages(EXAMPLE_MESSAGES)
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
            renderMessage={(props) => (
                <Message {...props} messageTextStyle={{ fontSize: 16 }} />
            )}
        />
    )
}