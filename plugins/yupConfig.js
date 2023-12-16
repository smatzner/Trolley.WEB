import * as yup from "yup";

export default defineNuxtPlugin((nuxtApp) => {
    yup.setLocale({
        mixed: {
            required: 'Bitte füllen Sie dieses Feld aus'
        },
        string: {
            email: 'Ungültige E-Mail-Adresse',
            min: '${path} sollte mindestens ${min} Zeichen lang sein',
        }
    })
})