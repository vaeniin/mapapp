import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { RootTabNavigator } from './src/components/Navigation/RootNavigators';
import { MarkingsProvider } from './src/components/contexts/MarkingsProvider';

export default App = () => {
  return (
    <PaperProvider>
        <MarkingsProvider>
            <NavigationContainer>
                    <RootTabNavigator />
                    <StatusBar />
            </NavigationContainer>
        </MarkingsProvider>
    </PaperProvider>
  );
}
