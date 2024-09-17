/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/preline/dist/*.js',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
        './node_modules/react-tailwindcss-select/dist/index.esm.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#E4F2F7', // disabled
                    200: '#BFE2EC',
                    300: '#B6DDEA',
                    400: '#9AD1E2', // hover
                    500: '#7FC4DA',
                    600: '#5AB3CF',
                    700: '#48ABCA', // main
                    800: '#06559D', //active
                },
                secondary: {
                    100: '#D6D6D6', //disabled
                    200: '#BBBBBB',
                    300: '#999999',
                    400: '#777777', //hover
                    500: '#555555',
                    600: '#333333',
                    700: '#1A1A1A', //main
                },
                theme: {
                    lightBlue1: '#48ABCA',
                },
                state: {
                    NotYetStarted: '#D8846A',
                    Started: '#5D9614',
                    InProgress: '#81C95F',
                    OnHold: '#CF3939',
                    Discontinued: '#878787',
                    Mastered: '#03018B',
                },
            },
        },
        fontFamily: {
            sans: ['Lato', 'sans-serif'],
        },
    },
    plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
    important: true,
};
