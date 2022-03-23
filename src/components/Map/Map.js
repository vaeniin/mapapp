import React, { Fragment, useEffect, useState } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Platform,
    UIManager,
    Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { Portal } from 'react-native-paper';

import i18n from '../utils/setUpLocalization';
import { getCoordinate } from '../utils/getCoordinate';
import { hexToRGB } from '../utils/hexToRGB';
import { useMarkings } from '../contexts/MarkingsProvider';
import MarkerContent from './MarkerContent';
import MapMenu from './MapMenu';
import CreateMarking from './CreateMarking';
import { getData, REGION_KEY, storeData } from '../utils/storage';

if ( Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { height } = Dimensions.get('window');

const Map = () => {

    const {
        region,
        setRegion,
        marker,
        polygon,
        markings,
        groups,
        createMarker,
        createPolygon,
        getGroup,
        filter,
    } = useMarkings();

    const [selected, setSelected] = useState();
    const [isReadyToSave, setIsReadyToSave] = useState(false);
    const [history, setHistory] = useState([]);
    const [filtered, setFiltered] = useState(markings);

    useEffect(() => {
        if (filter) setFiltered(markings.filter(marking => marking.group === filter));
        else setFiltered(markings);
    }, [filter, markings, groups]);

    useEffect(() => {
        (async () => {
            let enabled = await Location.hasServicesEnabledAsync();
            if (!enabled) {
                alert(i18n.t('errors.permission'));
                return;
            }

            let { status } = await Location.requestForegroundPermissionsAsync();
                
            if (status !== 'granted') {
                alert(i18n.t('errors.permission'));
                return;
            }

            try {
                const { coords } = await Location.getCurrentPositionAsync({});
                if (coords) {
                    setRegion({ ...coords, latitudeDelta: 0.0522, longitudeDelta: 0.0221 });
                    storeData([[REGION_KEY, { ...coords, latitudeDelta: 0.0522, longitudeDelta: 0.0221 }]]);
                }
            } catch(e) {
                const location = await Location.getLastKnownPositionAsync({});
                if (location) setRegion({ ...location.coords, latitudeDelta: 0.0522, longitudeDelta: 0.0221 });
                else {
                    const data = await getData(REGION_KEY);
                    if (data) setRegion({ latitude: data.latitude, longitude: data.longitude, latitudeDelta: 0.0522, longitudeDelta: 0.0221 });
                }
            }
        })();
    }, []);

    const add = (coords) => {
        if (selected === 'marker') {
            createMarker(coords);
            setHistory(prev => [marker, ...prev]);
        }
        if (selected === 'polygon') {
            if (polygon.length > 0) setHistory(prev => [polygon[0], ...prev]);
            createPolygon(coords);
        }
    }; 

    const getColor = (id) => {
        const group = getGroup(id);
        if (group) return group.color;
        else return '#ff0000';
    };

    const handleDrag = (e) => {
        createMarker(e.nativeEvent.coordinate);
        setHistory(prev => [marker, ...prev]);
    };

    const toggle = (polygon) => {
        polygon.showCallout();
    };

    return (
        <Portal.Host>
            <View style={[styles.container, !region && { justifyContent: 'center', alignItems: 'center' }]}>
                {region ?
                    <MapView
                        style={styles.map}
                        mapType='hybrid'
                        region={region}
                        onPress={(e) => add(e.nativeEvent.coordinate)}
                        onRegionChangeComplete={setRegion}
                        toolbarEnabled={false}
                    >
                        {marker &&
                            <Marker
                                coordinate={marker}
                                draggable={true}
                                onDragEnd={handleDrag}
                            />
                        }
                        {polygon.length > 0 &&
                            <Polygon
                                coordinates={polygon}
                                strokeWidth={3}
                                strokeColor='rgba(255,0,0,0.7)'
                                fillColor='rgba(255,0,0,0.3)'
                            />
                        }
                        {filtered.map((marking, i) => 
                            <Fragment key={i}>
                                <Marker
                                    coordinate={getCoordinate(marking.coords)}
                                    pinColor={getColor(marking.group)}
                                    ref={ref => marking = ref}
                                    identifier={marking.id}
                                    opacity={marking.type === 'marker' ? 1 : 0}
                                >
                                    <Callout
                                        tooltip={true}
                                        onPress={() => marking.hideCallout()}
                                        style={{ flex: 1, position: 'relative' }}
                                    >
                                        <MarkerContent
                                            title={marking.title}
                                            description={marking.description}
                                        />
                                    </Callout>
                                </Marker>
                                {marking.type === 'polygon' &&
                                    <Polygon
                                        coordinates={marking.coords}
                                        strokeWidth={3}
                                        strokeColor={hexToRGB(getColor(marking.group), 0.7)}
                                        fillColor={hexToRGB(getColor(marking.group), 0.3)}
                                        tappable={true}
                                        onPress={() => toggle(marking)}
                                    />
                                }
                        </Fragment>
                        )}
                    </MapView>
                : 
                    <ActivityIndicator loading={true} size={70} color='#007aff' />
                }
                <>
                    {region && 
                        <MapMenu
                            selected={selected}
                            setSelected={setSelected}
                            setIsReadyToSave={setIsReadyToSave}
                            history={history}
                            setHistory={setHistory}
                        />
                    }
                    <CreateMarking
                        setIsReadyToSave={setIsReadyToSave}
                        setSelected={setSelected}
                        selected={selected}
                        isReadyToSave={isReadyToSave}
                    />
                </>
            </View>
        </Portal.Host>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        minHeight: height*0.89,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;