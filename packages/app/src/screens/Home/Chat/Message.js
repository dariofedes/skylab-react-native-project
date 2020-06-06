import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Day } from 'react-native-gifted-chat'

import Bubble from './Bubble'

export default function Message(props) {

    const getInnerComponentProps = () => {
        const isMe = props.currentMessage.user._id === 1

        return {
            ...props,
            position: isMe ? 'right' : 'left',
        }
    }

    const renderDay = () => {
        if (props.currentMessage.createdAt) {
            const dayProps = getInnerComponentProps()

            return <Day {...dayProps} />
        }

        return null
    }

    const renderBubble = () => {
        const bubbleProps = getInnerComponentProps()

        return (
            <Bubble {...bubbleProps}  />
        )
    }

    const renderAvatar = () => {
        const avatarProps = getInnerComponentProps()

        return (
            <Avatar
                {...avatarProps}
                imageStyle={{
                    left: { height: 40, width: 40, borderRadius: 20 },
                    right: { height: 40, width: 40, borderRadius: 20 }
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderDay()}
            <View style={props.position === 'left' ? styles.containerLeft : styles.containerRight} >
                {props.position === 'right' ? null : renderAvatar()}
                {renderBubble()}
                {props.position === 'left' ? null : renderAvatar()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 0,
  },
  containerRight: {
    flexDirection: 'row',
    marginLeft: 0,
    marginRight: 8,
  }
})
