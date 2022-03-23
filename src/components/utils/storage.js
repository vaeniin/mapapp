import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './setUpLocalization';

export const MARKINGS_KEY = '@markings';
export const GROUPS_KEY = '@groups';
export const REGION_KEY = '@region';

export const storeData = async (items) => {
    try {
        const jsonItems = items.map(item => [item[0], JSON.stringify(item[1])]);
        await AsyncStorage.multiSet(jsonItems);
    } catch (e) {
        alert(i18n.t('errors.saveData'));
    }
};

export const getData = async (key) => {
    try {    
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
     } catch(e) {
        alert(i18n.t('errors.readData'));
     }
};

export const getAllData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        return result.map(req => ({ name: req[0], value: JSON.parse(req.pop()) }) );
    } catch (e) {
        alert(i18n.t('errors.readData'));
    }
};