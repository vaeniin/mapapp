import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const MarkerContent = ({ title, description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {description !== '' && description !== undefined && <Text>{description}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 5,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    group: {
        textTransform: 'capitalize',
    },
});

export default MarkerContent;