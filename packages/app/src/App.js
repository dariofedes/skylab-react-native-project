import React, { useState, useEffect } from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Root } from 'native-base'
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
  console.disableYellowBox=true
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root>
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
      </Root>
    </SafeAreaView>
  );
};


export default App;
