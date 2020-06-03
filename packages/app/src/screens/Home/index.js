import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'

import Map from './Map'
import Lists from './Lists'
import Posts from './Posts'
import Profile from './Profile'

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
                    tabBarIcon: ({ color }) => <Icon name='map' color={color} size={20} />
                }} 
                name="Map"
            >
              {props => <Map  />}
            </TAB.Screen>

            <TAB.Screen
             options={{ 
                // tabBarBadge: 2,
                tabBarIcon: ({ color }) => <Icon name='list' color={color} size={20} />
            }}
             name="Lists"
            >
              {props => <Lists  />}
            </TAB.Screen>

            <TAB.Screen
             options={{ 
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <Icon name='grid' color={color} size={20} />
                    }

                    return <Icon name='grid' color={color} size={20} />
                }
            }}
             name="Posts"
            >
              {props => <Posts  />}
            </TAB.Screen>

            <TAB.Screen
             options={{ 
                tabBarIcon: ({ color }) => <Icon name='user' color={color} size={20} />
            }}
             name="Profile"
            >
              {props => <Profile {...props} />}
            </TAB.Screen>
        </TAB.Navigator>
    )
}