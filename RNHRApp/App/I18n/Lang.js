import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from './en';
import hi from './hi';

// Should the app fallback to English if user locale doesn't exists
// If an english translation is not available in en.js,
// it will look inside hi.js
I18n.fallbacks = true;
// It will convert HOME_noteTitle to
// "HOME note title" if the value of HOME_noteTitle
// doesn't exist in any of the translation files.
I18n.missingBehaviour = 'guess';
// If the current locale in device is not en or hi
I18n.defaultLocale = 'en';
// If we do not want the framework to use the phone's locale by default
I18n.locale = 'en';

// Define the supported translations
I18n.translations = {
  en,
  hi,
};

const currentLocale = I18n.currentLocale();

export const setLocale = (locale) => {
  I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale;

// Is it a RTL (Right to Left - arabic) language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function getText(name, params = {}) {
  return I18n.t(name, params);
}

// export default Lang;

// List of countries with country code
/*
Supported languages (ISO 639-1)
ar: Arabic
az: Azerbaijani
be: Belorussian
bg: Bulgarian
bs: Bosnian
ca: Catalan
cs: Czech
da: Danish
de: German
en: English
es: Spanish
et: Estonian
fa: Persian
fi: Finnish
fr: French
el: Greek
he: Hebrew
hr: Croatian
hu: Hungarian
hy: Armenian
it: Italian
id: Indonesian
ja: Japanese
ka: Georgian
kk: Kazakh
ko: Korean
ky: Kyrgyz
lt: Lithuanian
lv: Latvian
mk: Macedonian
mn: Mongolian
nb: Norwegian Bokmål
nl: Dutch
nn: Norwegian Nynorsk
pl: Polish
pt: Portuguese
ro: Romanian
ru: Russian
sk: Slovak
sl: Slovene
sr: Serbian
sv: Swedish
tr: Turkish
uk: Ukrainian
uz: Uzbek
zh: Chinese
hi:  Hindi
*/
