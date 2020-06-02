import React, { useState } from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './screens/Register'
import Login from './screens/Login'
import Home from './screens/Home'

import Context from '@skylab/services/src/Context';
import { API_URL } from '../config'

Context.API_URL = API_URL
Context.storage = AsyncStorage

const STACK = createStackNavigator()

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <STACK.Navigator initialRouteName='Register'  >
            <STACK.Screen name="Register">
              {props => <Register {...props} backgroundColor='#ebbf47'/>}
            </STACK.Screen>
            <STACK.Screen name="Login">
              {props => <Login {...props} backgroundColor='#ebbf47' />}
            </STACK.Screen>
            <STACK.Screen 
              name="Home" 
              options={{ headerShown: false, gestureEnabled: false }} 
            >
              {props => <Home {...props} />}
            </STACK.Screen>
        </STACK.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};


export default App;
