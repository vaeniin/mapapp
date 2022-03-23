import React from 'react';
import {
    Pressable,
    StyleSheet,
} from 'react-native';

const MapMenuItem = ({ children, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.option, { backgroundColor: pressed ? '#007aff' : 'rgba(0, 0, 0, 0.7)' }]}
            onPress={onPress}
        >
            { children }
        </Pressable>
    );
};

const styles = StyleSheet.create({
    option: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 4,
    },
});

export default MapMenuItem;