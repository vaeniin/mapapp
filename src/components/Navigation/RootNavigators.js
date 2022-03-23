import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Map from '../Map/Map';
import { TopNavigator } from './TabNavigators';

const RootTab = createMaterialBottomTabNavigator();
const RootStack = createStackNavigator();

const stackScreenOptions = {
    headerShown: false,
};

const { height } = Dimensions.get('window');

const tabScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
        let icon;
        
        if (route.name === 'Map') icon = 'map';
        else if (route.name === 'Settings') icon = 'list';

        return <FontAwesome name={icon} size={26} color={color} />
    },
});

export const RootStackNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={stackScreenOptions}>
            <RootStack.Screen name='TopBar' component={TopNavigator} />
        </RootStack.Navigator>
    );
};

export const RootTabNavigator = () => {
    return (
        <RootTab.Navigator
            labeled={false}
            screenOptions={tabScreenOptions}
            barStyle={{
                height: 0.08*height,
                padding: '0%',
                margin: '0%',
                backgroundColor: '#007aff',
                justifyContent: 'center',
            }}
        >
            <RootTab.Screen name='Map'component={Map} />
            <RootTab.Screen name='Settings' component={RootStackNavigator} />
        </RootTab.Navigator>
    );
};