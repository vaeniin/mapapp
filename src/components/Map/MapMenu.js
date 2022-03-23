import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Animated,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import i18n from '../utils/setUpLocalization';
import { useMarkings } from '../contexts/MarkingsProvider';
import Dropdown from '../Shared/Dropdown';
import MapMenuItem from './MapMenuItem';

const MapMenu = ({ selected, setSelected, setIsReadyToSave, history, setHistory }) => {

    const { 
        marker,
        polygon,
        clearMarker,
        clearPolygon,
        createMarker,
        undoPolygon,
        groups,
        setFilter,
        filter,
        getGroup,
    } = useMarkings();

    const [openFilter, setOpenFilter] = useState(false);

    const select = (value) => {
        if (selected === value) {
            setSelected(null);
            clearMarker();
            clearPolygon();
            setHistory([]);
        } else {
            if (value === 'marker') clearPolygon([]);
            else if (value === 'polygon') clearMarker();
            setSelected(value);
        }
    };

    const undo = () => {
        if (history.length > 0) { 
            if (selected === 'marker') createMarker(history[0]);
            else if (selected === 'polygon') undoPolygon();
            setHistory(prev => prev.slice(1));
        } else {
            clearMarker();
            clearPolygon();
        }
    };

    const formatGroup = () => {
        const value = getGroup(filter);
        if (value) return value.name.charAt(0).toUpperCase() + value.name.slice(1);
        else return null;
    };

    const filterAnim = useRef(new Animated.Value(0)).current;

    const animation = (toValue) => {
        return Animated.timing(filterAnim, {
            toValue,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (openFilter) animation(1);
        else animation(0);
    }, [openFilter]);

    return (
        <View style={styles.container}>
            <View style={styles.topleft}>
                {groups.length > 0 &&
                    <MapMenuItem
                        onPress={() => setOpenFilter(!openFilter)}
                    >
                        <MaterialCommunityIcons name='filter-menu-outline' size={40} color='#fff' />
                    </MapMenuItem>
                }
                <Animated.View style={{
                    width: filterAnim.interpolate({inputRange: [0, 1], outputRange: [0, 140]}),
                    opacity: filterAnim
                }}>
                    <Dropdown
                        values={groups}
                        formatInput={formatGroup}
                        select={setFilter}
                        label={filter ? '' : i18n.t('filter')}
                        style={{ width: '35%', left: '20%' }}
                    />
                </Animated.View>
            </View>
            {selected &&
                <View style={styles.topright}>
                    <MapMenuItem
                        onPress={undo}
                    >
                        <Ionicons name='ios-arrow-undo' size={40} color='#fff' />
                    </MapMenuItem>
                    <MapMenuItem
                        onPress={() => (marker || polygon.length > 2) ? setIsReadyToSave(true) : {}}
                    >
                        <Ionicons name='ios-checkmark' size={40} color='#fff' />
                    </MapMenuItem>
                </View>
            }
            <View style={styles.bottomleft}>
                <Pressable
                    style={[styles.option, { backgroundColor: selected === 'marker' ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.7)'}]}
                    onPress={() => select('marker')}
                >
                    <FontAwesome5 name='map-marker-alt' size={40} color='#fff' />
                </Pressable>
                <Pressable
                    style={[styles.option, { backgroundColor: selected === 'polygon' ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.7)'}]}
                    onPress={() => select('polygon')}
                >
                    <FontAwesome5 name='draw-polygon' size={40} color='#fff' />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomleft: {
        position: 'absolute',
        top: '74%',
        left: '2%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topright: {
        position: 'absolute',
        right: '2%',
        top: '1%',
        flexDirection: 'row',
    },
    topleft: {
        position: 'absolute',
        top: '1%',
        left: '2%',
        flexDirection: 'row',
    },
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

export default MapMenu;