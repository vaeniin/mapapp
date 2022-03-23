import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storeData, getAllData, GROUPS_KEY, MARKINGS_KEY } from '../utils/storage';

const MarkingsContext = createContext();

export const useMarkings = () => useContext(MarkingsContext);

export const MarkingsProvider = ({ children }) => {

    const [region, setRegion] = useState();
    const [groups, setGroups] = useState([]);
    const [markings, setMarkings] = useState([]);
    const [marker, setMarker] = useState();
    const [polygon, setPolygon] = useState([]);
    const [filter, setFilter] = useState();

    useEffect(() => {
        (async () => {
            const data = await getAllData();
            try {
                setGroups(data.find(e => e.name === GROUPS_KEY).value || []);
                setMarkings(data.find(e => e.name === MARKINGS_KEY).value || []); 
             } catch (e) {
                setGroups([]);
                setMarkings([]);
            }
       })()
    }, []);

    const createGroup = (group, selected) => {
        const id = group.id || uuidv4();
        const updatedGroups = [...groups.filter(e => e.id !== group.id), { ...group, id }];
        const updatedMarkings = [...markings.filter(e => {
            const result = selected.includes(e.id);
            if ( ( e.group || !e.group ) && result) e.group = id;
            else if (e.group === group.id && !result) e.group = undefined;

            return e;
        })];

        setGroups(updatedGroups);
        setMarkings(updatedMarkings);

        storeData([[GROUPS_KEY, updatedGroups], [MARKINGS_KEY, updatedMarkings]]);
    };

    const deleteGroup = (group) => {
        const updatedGroups = [...groups.filter(e => e.id !== group)]
        setGroups(updatedGroups);
        storeData([[GROUPS_KEY, updatedGroups]]);
    };

    const getGroup = (id) => {
        const group = groups.find(group => group.id === id);
        if (group) return group;
        else return undefined;
    };

    const createMarking = (value) => {
        const marking = value.type === 'marker' ? [marker] : polygon;
        const updatedMarkings = [...markings, { ...value, id: uuidv4(), createdAt: new Date(), editedAt: new Date(), coords: marking }];
        setMarkings(updatedMarkings);
        storeData([[MARKINGS_KEY, updatedMarkings]]);
    };

    const editMarking = (marking) => {
        const updatedMarkings = [...markings.filter(e => e.id !== marking.id), { ...marking, editedAt: new Date() }];
        setMarkings(updatedMarkings);
        storeData([[MARKINGS_KEY, updatedMarkings]]);
    };

    const deleteMarking = (marking) => {
        const updatedMarkings = [...markings.filter(e => e.id !== marking)];
        setMarkings(updatedMarkings);
        storeData([[MARKINGS_KEY, updatedMarkings]]);
    };

    const getMarking = (id) => {
        const marking = markings.find(group => group.id === id);
        if (marking) return marking;
        else return undefined;
    };

    const createMarker = (coords) => {
        setMarker(coords);
    };

    const clearMarker = () => {
        setMarker();
    };

    const createPolygon = (coords) => {
        setPolygon(prev => [coords, ...prev]);
    };

    const undoPolygon = () => {
        setPolygon(prev => prev.slice(1));
    };

    const clearPolygon = () => {
        setPolygon([]);
    };

    const value = {
        groups,
        markings,
        marker,
        polygon,
        region,
        filter,
        setRegion,
        createPolygon,
        createMarker,
        createGroup,
        createMarking,
        deleteGroup,
        deleteMarking,
        editMarking,
        getGroup,
        getMarking,
        clearMarker,
        clearPolygon,
        undoPolygon,
        setFilter,
    };

    return (
        <MarkingsContext.Provider value={value}>
            {children}
        </MarkingsContext.Provider>
    );
};