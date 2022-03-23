import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import i18n from '../utils/setUpLocalization';
import { GroupsNavigator, MarkingsNavigator } from './StackNavigators';

const TopTab = createMaterialTopTabNavigator();

export const TopNavigator = () => {
    return (
        <TopTab.Navigator
            screenOptions={{
                swipeEnabled: false
            }}
        >
            <TopTab.Screen name={i18n.t('tabs.markings')} component={MarkingsNavigator} />
            <TopTab.Screen name={i18n.t('tabs.groups')} component={GroupsNavigator} />
        </TopTab.Navigator>
    );
};
