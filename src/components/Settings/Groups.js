import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useMarkings } from '../contexts/MarkingsProvider';
import { SwipeableProvider } from '../contexts/SwipeableProvider';
import SwipeableItem from './SwipeableItem';

const Groups = ({ navigation }) => {
    
    const { groups, deleteGroup } = useMarkings();

    const [selected, setSelected] = useState();

    const select = (id) => {
        if (selected === id) setSelected();
        else setSelected(id);
    };

    const navigate = (type) => {
        if (selected && type === 'edit') navigation.navigate('EditGroup', { id: selected });
        else if (type === 'new') navigation.navigate('EditGroup');

        if (selected) setSelected();
    };

    const renderItem = ({ item }) =>
        <SwipeableItem
            id={item.id}
            rightAction={deleteGroup}
        >
            <Pressable
                style={[styles.group, { backgroundColor: item.id === selected ?  '#a9a9a9' : '#ddd' }]}
                onPress={() => select(item.id)}
            >
                <Text style={styles.title}>{item.name}</Text>
                <View style={[styles.square, { backgroundColor: item.color }]}/>
            </Pressable>
        </SwipeableItem>

    const renderHeader = 
        <View style={styles.header}>
            <Pressable
                style={({ pressed }) => [styles.icon, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}
                onPress={() => navigate('edit')}
            >
                <FontAwesome name='edit' size={30} />
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.icon, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}
                onPress={() => navigate('new')}
            >
                <FontAwesome name='plus-square-o' size={30} />
            </Pressable>
        </View>

    return (
        <View style={styles.container}>
            <SwipeableProvider>
                <FlatList
                    data={groups.sort((a, b) => {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    })}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                />
            </SwipeableProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginTop: 10,
    },
    icon: {
        borderRadius: 10,
        width: '50%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    group: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        textTransform: 'capitalize',
        fontSize: 17,
    },
    square: {
        width: 25,
        height: 25,
        borderRadius: 5,
        borderWidth: 1,
    },
    delete: {
        justifyContent: 'center',
        marginRight: '4%',
    },
});

export default Groups;