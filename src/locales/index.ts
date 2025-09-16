import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'

const resources = {
  en: {
    translation: en
  }
}
const appInstance = i18n.createInstance()
appInstance.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export const languages = Object.keys(resources)
export default appInstance
