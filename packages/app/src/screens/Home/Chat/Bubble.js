import React from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

export default function Bubble(props) {

    const renderMessageText = () => {
        const { text } = props.currentMessage
        if (text) {
            if (props.position === 'left') {
                return <Text style={styles.text}>{text}</Text>
            }
    
            return <Text style={{ ...styles.text, color: '#fff' }}>{text}</Text>
        }

        return null
    }

    const renderUsername = () => {
        const username = props.currentMessage.user.name
        
        if (!username) return null

        if (props.position === 'left') {
            return <Text style={styles.name}>{username}</Text>
        }

        return <Text style={{ ...styles.name, color: '#fff' }}>{username}</Text>
    }    

    return (
        <View style={[
            props.containerStyle,
            props.position === 'left' ? styles.leftContainer : styles.rightContainer
        ]}>
            {renderUsername()}
            {renderMessageText()}
        </View>
    )
}

const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginRight: 100
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#73b9ff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginLeft: 100
  },
  text: {
      fontSize: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
}
})
