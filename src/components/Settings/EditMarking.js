import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';

import { getCoordinate } from '../utils/getCoordinate';
import { validateLatLon } from '../utils/validateLatLon';
import i18n from '../utils/setUpLocalization';
import { useMarkings } from '../contexts/MarkingsProvider';
import Dropdown from '../Shared/Dropdown';

const EditMarking = ({ navigation, route }) => {

    const {
        groups,
        getGroup,
        getMarking,
        editMarking,
        setRegion,
    } = useMarkings();

    const marking = route.params && getMarking(route.params.id);

    const [title, setTitle] = useState(marking?.title);
    const [description, setDescription] = useState(marking?.description);
    const [coords, setCoords] = useState(marking?.coords);
    const [group, setGroup] = useState(marking?.group);
    const [errors, setErrors] = useState({ title: '', coords: ''});

    const onSubmit = () => {
        const result = validateLatLon(coords);
        if (title && result) {
            editMarking({ type: 'marker', id: marking.id, title, description: description ? description.trim() : undefined, coords: coords, group, createdAt: marking.createdAt });
            navigation.goBack();
       } else setErrors({ title: title ? '' : i18n.t('errors.marking'), coords: result ? ' ' : i18n.t('errors.coords') });
    };

    const formatGroup = () => {
        const value = getGroup(group);
        if (value) return value.name.charAt(0).toUpperCase() + value.name.slice(1);
        else return null;
    };

    const navigate = () => {
        setRegion({ ...getCoordinate(marking.coords), latitudeDelta: 0.0122, longitudeDelta: 0.0121 });
        navigation.navigate('Map');
    };

    const onEditLatLon = (input, i) => {
        const latlon = input.trim().split(' ');
        const updated = [...coords];
        updated[i] = { latitude: latlon[0] || '', longitude: latlon[1] || ''};

        setCoords(updated);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
                <Ionicons name='ios-return-down-back' size={40} />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginVertical: '3%' }}>
            {errors.title !== '' && <Text style={styles.error}>{errors.title}</Text>}
            <TextInput
                mode='outlined'
                style={styles.input}
                theme={{ colors: { primary: '#007aff' } }}
                label={i18n.t('markings.title')}
                value={title}
                onChangeText={setTitle}
                error={errors.title !== '' ? true : false}
            />
            <TextInput
                mode='outlined'
                style={styles.input}
                theme={{ colors: { primary: '#007aff' } }}
                label={i18n.t('markings.description')}
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
                maxHeight={120}
            />
            {errors.coords !== '' && <Text style={styles.error}>{errors.coords}</Text>}
            {
                coords.map((coord, i) => 
                    <TextInput
                        key={i}
                        mode='outlined'
                        style={styles.input}
                        theme={{ colors: { primary: '#007aff' } }}
                        label={i18n.t('markings.location')}
                        value={`${coord.latitude.toString()} ${coord.longitude.toString()}`}
                        onChangeText={text => onEditLatLon(text, i)}
                        autoCompleteType='off'
                        autoCorrect={false}
                    />
                )
            }
            <Dropdown
                values={groups}
                formatInput={formatGroup}
                select={setGroup}
                label={i18n.t('markings.group')}
            />
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={({ pressed }) => [styles.jumpTo, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}
                    onPress={navigate}
                >
                    <Ionicons name='ios-arrow-undo' size={20} color='#007aff' />
                    <Text style={styles.title}> {i18n.t('markings.showOnMap')}</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}
                    onPress={onSubmit}
                >
                    <Text style={styles.title}>{i18n.t('saveEdit')}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '3%',
    },
    goBack: {
        marginVertical: '1%',
    },
    input: {
        marginTop: '1%',
        marginBottom: '3%',
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        marginBottom: '1%',
    },
    jumpTo: {
        borderRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        textTransform: 'uppercase',
        color: '#007aff',
        fontWeight: 'bold',
    },
    menu: {
        position: 'relative',
        left: '5%',
        width: '90%',
        marginTop: '10%',
    },
    menuItem: {
        flex: 1,
        maxWidth: '100%',
    },
    menuTitle: {
        textTransform: 'capitalize',
    },
    error: {
        color: '#b22d1d',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default EditMarking;