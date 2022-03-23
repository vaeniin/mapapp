import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { fi, en } from './supportedLanguages';

i18n.translations = { 
    en, 
    fi,
};

i18n.fallbacks = true;
i18n.locale = Localization.locale;

export default i18n;