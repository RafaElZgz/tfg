export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {
                    src: '/vendor/preline/preline.js',
                    body: true,
                    defer: true,
                },
            ],
        },
    },

    build: {
        transpile: ['vue-sonner'],
    },

    css: ['@/assets/css/main.scss'],

    devServer: {
        port: 8080,
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-icon',
    ],

    srcDir: 'src',

    /*
        Modules
    */
});
