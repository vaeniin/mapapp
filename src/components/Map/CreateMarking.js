import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Keyboard,
} from 'react-native';
import { TextInput, Modal, Portal } from 'react-native-paper';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import i18n from '../utils/setUpLocalization';
import { useMarkings } from '../contexts/MarkingsProvider';
import Dropdown from '../Shared/Dropdown';

const CreateMarking = ({ setIsReadyToSave, isReadyToSave, selected, setSelected }) => {

    const {
        clearMarker,
        clearPolygon,
        createMarking,
        groups,
        getGroup,
    } = useMarkings();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [group, setGroup] = useState();
    const [error, setError] = useState();

    const closeModal = () => {
        if (title) {
            clearEdit();
            createMarking({ type: selected, title, description, group });
        } else setError(i18n.t('errors.marking'))
    };

    const clearEdit = () => {
        setIsReadyToSave(false);
        clearMarker();
        clearPolygon();
        setSelected();
        setTitle();
        setDescription();
        setGroup();
        setError();
    };

    const hideModal = () => setIsReadyToSave(false);

    const formatGroup = () => {
        const value = getGroup(group);
        if (value) return value.name.charAt(0).toUpperCase() + value.name.slice(1);
        else return null;
    };

    useEffect(() => {
        setTitle();
        setDescription();
        setGroup();
        setError();
    }, [selected])

    return (
        <Portal>
            <Modal
                visible={isReadyToSave}
                onDismiss={hideModal}
                contentContainerStyle={styles.content}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{i18n.t('markings.detailsTitle')}</Text>
                    <Pressable
                        onPress={hideModal}
                    >
                        <MaterialIcons name='clear' size={30} color='#000' />
                    </Pressable>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <TextInput
                    mode='flat'
                    label={i18n.t('markings.title')}
                    style={styles.input}
                    onChangeText={setTitle}
                    theme={{ colors: { primary: '#007aff' } }}
                    error={error ? true : false}
                    defaultValue={title}
                />
                <TextInput
                    mode='flat'
                    label={i18n.t('markings.description')}
                    style={styles.input}
                    defaultValue={description}
                    onChangeText={setDescription}
                    theme={{ colors: { primary: '#007aff' } }}
                />
                <Dropdown
                    values={groups}
                    formatInput={formatGroup}
                    select={setGroup}
                    label={i18n.t('markings.group')}
                />
                <Pressable
                    style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}
                    onPress={closeModal}
                >
                    <Text style={styles.buttonTitle}>{i18n.t('saveNewMarking')}</Text>
                </Pressable>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: '2%',
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: '3%',
    },
    input: {
        marginVertical: '2%',
    },
    button: {
        position: 'relative',
        left: '25%',
        bottom: 0,
        width: '50%',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: '1%',
    },
    title: {
        fontSize: 18,
        color: '#000'
    },
    error: {
        color: '#b22d1d',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonTitle: {
        textTransform: 'uppercase',
        color: '#007aff',
        fontWeight: 'bold',
    },
});

export default CreateMarking;