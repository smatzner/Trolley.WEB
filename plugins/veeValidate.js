import {configure} from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
    configure({
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
        validateOnModelUpdate: true,
    })
})