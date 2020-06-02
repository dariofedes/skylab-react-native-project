import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'

import HomeOne from './HomeOne'
import HomeTwo from './HomeTwo'
import HomeThree from './HomeThree'
import HomeFour from './HomeFour'

const TAB = createMaterialBottomTabNavigator();

export default function Home(props) {
    return (
        <TAB.Navigator
            shifting
            activeColor='purple'
            inactiveColor='#999'
            barStyle={{ backgroundColor: '#fff' }}
        >
            <TAB.Screen
                options={{ 
                    tabBarIcon: ({ color }) => <Icon name='home' color={color} size={20} />
                }} 
                name="HomeOne"
            >
              {props => <HomeOne  />}
            </TAB.Screen>

            <TAB.Screen
             options={{ 
                tabBarBadge: 2,
                tabBarIcon: ({ color }) => <Icon name='list' color={color} size={20} />
            }}
             name="HomeTwo"
            >
              {props => <HomeTwo  />}
            </TAB.Screen>

            <TAB.Screen
             options={{ 
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <Icon name='bell' color={color} size={20} />
                    }

                    return <Icon name='bell-off' color={color} size={20} />
                }
            }}
             name="HomeThree"
            >
              {props => <HomeThree  />}
            </TAB.Screen>

            <TAB.Screen
             options={{ 
                tabBarIcon: ({ color }) => <Icon name='user' color={color} size={20} />
            }}
             name="HomeFour"
            >
              {props => <HomeFour {...props} />}
            </TAB.Screen>
        </TAB.Navigator>
    )
}