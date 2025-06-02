import React from "react";
import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    //languaje detector only in web
    .init({
        resources: {
            en: {
                translation: {
                    "welcome": "Welcome to our application",
                    "goodbye": "Goodbye and see you soon"
                }
            },
            es: {
                translation: {
                    "welcome": "Bienvenido a nuestra aplicación",
                    "goodbye": "Adiós y hasta pronto"
                }
            }
        },
        lng: "es", // default language
        fallbackLng: "es", // fallback language
        interpolation: {
            escapeValue: false // React already does escaping
        }
    })