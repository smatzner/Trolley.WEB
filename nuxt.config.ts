export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            title: "Trolley",
            script: [{src: "https://js.stripe.com/v3/", defer: true}],
        }
    },
    runtimeConfig: {
        public: {
            stripePk: process.env.STRIPE_PUBLIC_KEY,
        },
    },
    devtools: {enabled: true},
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "nuxt-primevue",
        "nuxt-icon",
        "@nuxtjs/device",
        "@vee-validate/nuxt"
    ],
    primevue: {
        components: {
            prefix: 'Prime',
            include: '*',
        },
        cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    },
    veeValidate: {
        autoImports: true,
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage',
        }
    },
    css: ['primevue/resources/themes/lara-light-blue/theme.css'],
    plugins: [
        '~/plugins/auth.js',
        '~/plugins/yupConfig.js',
        '~/plugins/veeValidate.js',
        '~/plugins/error-handler.ts'
    ],
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },
})