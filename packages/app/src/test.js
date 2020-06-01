/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
  Alert
} from 'react-native';


const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height



const STYLES = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text1: {
    color: '#fff'
  },
  box: {
    backgroundColor: 'purple',
    width: WIDTH / 2,
    height: HEIGHT / 4
  }
})

const App = () => {
  const [text, setText] = useState('')
  const [secure, setSecure] = useState(true)
  const [visibleModal, showModal] = useState(false)

  return (
    <View style={{flex: 1 }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: 'red'}}/>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#999'}}>
          <ScrollView contentContainerStyle={STYLES.container}>
          <KeyboardAvoidingView behavior={'position'}>

            {Platform.OS === 'android' && <Text onPress={() => console.log('pressed')}>Hello SKYLABERS!</Text>}

            <TouchableOpacity onPress={() => setSecure(!secure)} style={{ backgroundColor: 'pink', width: 200, height: 50}}>
              <Text>Opacity</Text>
              <Text>hey</Text>
            </TouchableOpacity>

            <TouchableHighlight onPress={() => showModal(true)} style={{ backgroundColor: 'red', width: 200, height: 50}}>
              <Text>Highlight</Text>
            </TouchableHighlight>

            <TouchableWithoutFeedback onPress={() => {
             Alert.alert(
              "Alert Title",
              "My Alert Msg",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
            }} >
              <View style={{ backgroundColor: 'blue', width: 200, height: 50}}>
                <Text>Without Feedback</Text>
                <Text>hey</Text>
              </View>
            </TouchableWithoutFeedback>

            <Image 
              resizeMode='contain'
              style={{ width: 300, height: 300 }}
              source={{uri: 'https://cdn.pixabay.com/photo/2020/04/21/18/49/tropical-5074304_1280.jpg'}}
            />

            <TextInput 
              secureTextEntry={secure}
              placeholder='hello'
              value={text}
              style={{ width: WIDTH -40, borderColor:'#000', borderWidth: 1, marginTop: 20 }}
              onChangeText={(text) => setText(text)}
            />
          </KeyboardAvoidingView>

          <Modal
            animationType='fade'
            visible={visibleModal}
          >
            <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
              <Text>Hey! I am a modal!</Text>
              <Text onPress={() => showModal(false)}>Press to close</Text>
            </View>
          </Modal>
          </ScrollView>
      </SafeAreaView>
    </View>
  );
};


export default App;
