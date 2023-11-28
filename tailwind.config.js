/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: [],
    theme: {
        content: [
            "./components/**/*.{js,vue,ts}",
            "./layouts/**/*.vue",
            "./pages/**/*.vue",
            "./plugins/**/*.{js,ts}",
            "./app.vue",
            "./error.vue",
        ],
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            colors: {
                ...colors,
                'trolley-primary': {
                    DEFAULT: '#3F51B5',
                    200: '#757de8',
                    300: '#dedeff',
                },
                'trolley-accent': {
                    DEFAULT: '#2196F3',
                    200: '#003f8f',
                },
                'trolley-secondary': {
                    100: '#f5f5f5',
                    200: '#cccccc',
                }
            },
        },
    },
    plugins: [],
}

