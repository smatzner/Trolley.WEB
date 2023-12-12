export default defineNuxtConfig({
    app: {
        head: {
            title: "Trolley",
            script: [{ src: "https://js.stripe.com/v3/", defer: true }],
        }
    },
    runtimeConfig: {
        public: {
            stripePk: process.env.STRIPE_PUBLIC_KEY,
        },
    },
    devtools: { enabled: true },
    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-primevue", "nuxt-icon"],
    primevue: {
        components: {
            prefix: 'Prime',
            include: '*',
        },
        cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    },

    css: ['primevue/resources/themes/lara-light-blue/theme.css'],
    plugins: ['~/plugins/auth.js']
})
