import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        debug: true, fallbackLng: "fr", interpolation: {
            escapeValue: false // react already safes from xss
        }
    }).then(r => console.log("I18N Loaded"));

export default i18n;