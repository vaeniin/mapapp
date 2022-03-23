import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    FlatList,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ColorPicker } from 'react-native-color-picker';
import { TextInput } from 'react-native-paper';

import i18n from '../utils/setUpLocalization';
import { useMarkings } from '../contexts/MarkingsProvider';

const EditGroup = ({ navigation, route }) => {

    const {
        markings,
        createGroup,
        getGroup,
    } = useMarkings();

    const group = route.params && getGroup(route.params.id);

    const [selected, setSelected] = useState(group ? markings.filter(marking => marking.group === group.id).map(marking => marking.id) : []);
    const [color, setColor] = useState(group?.color);
    const [name, setName] = useState(group?.name);
    const [errors, setErrors] = useState({ name: '', color: '' });

    const select = (id) => {
        if (selected.includes(id)) setSelected(selected.filter(item => item !== id));
        else setSelected(prev => [...prev, id]);
    };

    const renderItem = ({ item }) => {
        const result = selected.includes(item.id)
        const bgColor = result ?  '#a9a9a9' : 'transparent';

        return <Text style={[styles.marking, { backgroundColor: bgColor }]} onPress={() => select(item.id)}>{item.title}</Text>
    };

    const renderSeparator = () => {
        return <View style={styles.separator}></View>
    };

    const onSubmit = () => {
       if (name && color) {
            createGroup({ id: group?.id, name, color }, selected);
            navigation.goBack();
       } else setErrors({ name: name ? '' : i18n.t('errors.group'), color: color ? '' : i18n.t('errors.color')});
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
                <Ionicons name='ios-return-down-back' size={40} />
            </Pressable>
            {errors.name !== '' && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
                mode='outlined'
                style={styles.input}
                theme={{ colors: { primary: '#007aff' } }}
                label={i18n.t('groups.name')}
                value={name}
                onChangeText={setName}
                error={errors.name !== '' ? true : false}
            />
            {errors.color !== '' && <Text style={styles.error}>{errors.color}</Text>}
            <Text style={styles.label}>{i18n.t('groups.color')}:</Text>
            <ColorPicker
                onColorSelected={setColor}
                style={styles.colorpicker}
                hideSliders={true}
                defaultColor={group?.color}
            />
            {markings.length > 0 && <Text style={styles.label}>{i18n.t('groups.add')}:</Text>}
            <FlatList
                data={markings.sort((a, b) => {
                    let x = a.title.toLowerCase();
                    let y = b.title.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.markings}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                extraData={selected}
                showsVerticalScrollIndicator={false}
            />
            <Pressable
                style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}
                onPress={onSubmit}
            >
                <Text style={styles.title}>{i18n.t(`${group ? 'saveEdit' : 'saveNewGroup' }`)}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goBack: {
        marginHorizontal: '5%',
        marginVertical: '1%',
    },
    markings: {
        margin: '3%',
        padding: '2%',
    },
    marking: {
        textTransform: 'capitalize',
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: '#000',
        borderRadius: 5,
    },
    label: {
        marginHorizontal: '3%',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginVertical: '1%',
    },
    button: {
        borderRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        marginBottom: '1%',
        marginTop: '2%',
        alignSelf: 'center',
    },
    colorpicker: {
        height: 150,
    },
    input: {
        marginHorizontal: '3%',
        marginTop: '1%',
        marginBottom: '3%',
    },
    title: {
        textTransform: 'uppercase',
        color: '#007aff',
        fontWeight: 'bold',
    },
    error: {
        color: '#b22d1d',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default EditGroup;