import colors from './tailwind/colors.js';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{vue,ts}', './node_modules/preline/dist/*.js'],
    theme: {
        extend: {
            colors: colors,
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('preline/plugin'),
    ],
};
