import React, { Fragment, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import { TextInput, Menu, Divider } from 'react-native-paper';

const Dropdown = ({ formatInput, select, values, label, style }) => {

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const menuAnchor =
        <TextInput
            mode='outlined'
            disabled={true}
            theme={{ colors: { primary: '#007aff' } }}
            label={label}
            value={formatInput()}
            right={<TextInput.Icon name={visible ? 'menu-up' : 'menu-down'} onPress={visible ? closeMenu : openMenu} />}
        />

    const chooseItem = (value) => {
        select(value);
        closeMenu();
    };

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={menuAnchor}
            style={[styles.menu, {...style}]}
        >
            <ScrollView bounces={false} style={{ maxHeight: 200 }}>
                <Menu.Item title='- - -' style={styles.menuItem} onPress={() => chooseItem()}/>
                <Divider />
                {values.map((value, i) =>
                    <Fragment key={value.id}>
                        <Menu.Item
                            onPress={() => chooseItem(value.id)}
                            title={value.name}
                            style={styles.menuItem}
                            titleStyle={styles.menuTitle}
                        />
                        {i < values.length - 1 && <Divider />}
                    </Fragment>
                )}
            </ScrollView>
        </Menu>
    );
};

const styles = StyleSheet.create({
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
});

export default Dropdown;