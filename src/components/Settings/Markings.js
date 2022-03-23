import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    Pressable,
    LayoutAnimation,
    Platform,
    UIManager,
    StyleSheet,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import i18n from '../utils/setUpLocalization';
import { useFocusEffect } from '@react-navigation/core';

import { getCoordinate } from '../utils/getCoordinate';
import { formatDate } from '../utils/formatDate';
import { useMarkings } from '../contexts/MarkingsProvider';
import { SwipeableProvider } from '../contexts/SwipeableProvider';
import SwipeableItem from './SwipeableItem';

if ( Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Markings = ({ navigation }) => {

    const {
        markings,
        deleteMarking,
        getGroup,
        setRegion,
    } = useMarkings();

    const [filtered, setFiltered] = useState(markings);
    const [selected, setSelected] = useState();
    const [query, setQuery] = useState();

    useFocusEffect(useCallback(() => {
        if (!query) setFiltered(markings);
    }, [markings]));

    const select = (id) => {
        if (selected === id) setSelected();
        else setSelected(id);
    };

    const navigate = (id) => {
        navigation.navigate('EditMarking', { id });
        setSelected();
    };

    const showOnMap = (marking) => {
        setRegion({ ...getCoordinate(marking.coords), latitudeDelta: 0.0122, longitudeDelta: 0.0121 });
        navigation.navigate('Map');
    };

    const onChangeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const renderItem = ({ item }) => {

        const group = getGroup(item.group);
        return (
            <SwipeableItem
                id={item.id}
                rightAction={deleteMarking}
                leftAction={navigate}
            >
                <Pressable
                    style={[styles.marking, { backgroundColor: item.id === selected ?  '#a9a9a9' : '#ddd' }]}
                    onPress={() => { select(item.id); onChangeLayout(); }}
                >
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        {item.id === selected &&
                            <>
                                <Text style={styles.createdAt}>{i18n.t('markings.createdAt')}: {formatDate(item.createdAt)}</Text>
                                {item.description !== undefined && <Text>{item.description}</Text>}
                                <Pressable
                                    onPress={() => showOnMap(item)}
                                    style={styles.location}
                                >
                                    {({ pressed }) =>
                                        <>
                                            <Ionicons name='ios-arrow-undo' size={20} color={pressed ? '#bebebe' : '#000'} />
                                            <MaterialIcons name='location-on' size={25} color={pressed ? '#bebebe' : '#000'} />
                                        </>
                                    }
                                </Pressable>
                            </>
                        }
                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {group && <View style={[styles.square, { backgroundColor: group.color }]}/>}
                            {group && <Text style={styles.group}> {group.name}</Text>}
                        </View>
                        <Text>{i18n.t('markings.editedAt')}: {formatDate(item.editedAt)}</Text>
                    </View>
                </Pressable>
            </SwipeableItem>
        );
    };

    const search = (text) => {
        const newData = markings.filter(item => {
            const group = getGroup(item.group);
            const itemData = `${text[0] === '#' ? '' : item.title} ${text[0] === '#' ? '' : item.description} ${group ? group.name : ''}`.toLowerCase();
            const textData = text[0] === '#' ? text.substring(1): text.toLowerCase();

            return itemData.indexOf(textData) > -1;
        });

        setFiltered(newData);
    };

    const renderHeader = 
        <Searchbar
            style={styles.searchbar}
            value={query}
            clearIcon={() => <MaterialIcons name='clear' size={20} />}
            onChangeText={text => { search(text); setQuery(text) }}
            placeholder={`${i18n.t('markings.search')}...`}
            autoCorrect={false}
        />;

    return (
        <View style={styles.container}>
            <SwipeableProvider>
                <FlatList
                    data={filtered.sort((a, b) => {
                        const bdate = new Date(b.editedAt);
                        const adate = new Date(a.editedAt);
                        return bdate - adate;
                    })}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    extraData={selected}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                />
            </SwipeableProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: '1%',
    },
    searchbar: {
        marginHorizontal: '4%',
        marginVertical: '2%',
    },
    delete: {
        justifyContent: 'center',
        marginRight: '4%',
    },
    edit: {
        justifyContent: 'center',
        marginLeft: '4%',
    },
    marking: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 5,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    group: {
        textTransform: 'capitalize',
    },
    createdAt: {
        textAlign: 'right',
    },
    location: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: '2%',
    },
    square: {
        width: 10,
        height: 10,
        borderRadius: 2,
        borderWidth: 1,
    },
});

export default Markings;