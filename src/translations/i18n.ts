import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

import EN from './en.json'
import ID from './id.json'

export const availableLanguages: { [key: string]: string } = {
    id: "Indonesia",
    en: "English"
}

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: EN },
        id: { translation: ID }
    },
    // lng: getLocales()[0].languageCode, // Get the first device language
    fallbackLng: 'en',
    compatibilityJSON: 'v3' // By default React Native projects does not support Intl
})

export default i18n
