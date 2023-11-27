// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Trolley"
        }
    },
    devtools: {enabled: true},
    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-primevue", "nuxt-icon"],
    primevue: {
        components: {
            prefix: 'Prime',
            include: '*',
        },
        cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    },
    css: ['primevue/resources/themes/lara-light-blue/theme.css'],
})