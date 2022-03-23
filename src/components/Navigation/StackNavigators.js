import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Groups from '../Settings/Groups';
import EditGroup from '../Settings/EditGroup';

import Markings from '../Settings/Markings';
import EditMarking from '../Settings/EditMarking';

const GroupStack = createStackNavigator();
const MarkingStack = createStackNavigator();

const screenOptions = {
    headerShown: false,
};

export const GroupsNavigator = () => {
    return (
        <GroupStack.Navigator screenOptions={screenOptions}>
            <GroupStack.Screen name='ListGroups' component={Groups} />
            <GroupStack.Screen name='EditGroup' component={EditGroup} />
        </GroupStack.Navigator>
    );
};

export const MarkingsNavigator = () => {
    return (
        <MarkingStack.Navigator screenOptions={screenOptions}>
            <MarkingStack.Screen name='ListMarkings' component={Markings} />
            <MarkingStack.Screen name='EditMarking' component={EditMarking} />
        </MarkingStack.Navigator>
    );
};