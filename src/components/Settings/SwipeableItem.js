import React, { useRef, useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

import { useSwipeable } from '../contexts/SwipeableProvider';

const SwipeableItem = ({ children, id, leftAction, rightAction }) => {

    const swipeableRef = useRef();

    const { openedItem, setOpenedItem } = useSwipeable();

    const close = () => {
        if (swipeableRef.current) swipeableRef.current.close();
    };

    const handleSwipe = () => {
        setOpenedItem(id)
    };

    useEffect(() => {
        if (openedItem && id !== openedItem) close();
    }, [id, openedItem]);

    const rightSwipeActions = () => 
    <Pressable
        style={styles.delete}
        onPress={() => rightAction(id)}
    >
        {({ pressed }) => <FontAwesome name='trash' size={40} color={pressed ? '#ddd' : '#000'} />}
    </Pressable>

    const leftSwipeActions = () =>
    <Pressable
        style={styles.edit}
        onPress={() => {
            if (swipeableRef.current) swipeableRef.current.close();
            leftAction(id);
        }}
    >
        {({ pressed }) => <MaterialIcons name='edit' size={35} color={pressed ? '#ddd' : '#000'} />}
    </Pressable>

    return (
        <Swipeable
            ref={swipeableRef}
            onSwipeableWillOpen={handleSwipe}
            renderRightActions={rightSwipeActions}
            renderLeftActions={leftAction ? leftSwipeActions : () => {}}
            friction={1.5}
            overshootFriction={8}
        >
            {children}
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    delete: {
        justifyContent: 'center',
        marginRight: '4%',
    },
    edit: {
        justifyContent: 'center',
        marginLeft: '4%',
    },
});

export default SwipeableItem;