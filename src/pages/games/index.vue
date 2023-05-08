<script setup lang="ts">
const games = [
    {
        name: '2048',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: '2048',
    },
    {
        name: 'UNO',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: '2048',
    },
    {
        name: 'Solitario',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: '2048',
    },
    {
        name: 'Hextris',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        link: '2048',
    },
];
</script>

<template>
    <div class="flex px-8 py-10 h-fit lg:h-full">
        <div class="max-w-[95%] m-auto">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-3xl font-bold md:text-5xl md:leading-tight">
                    Juegos
                </h2>
                <p class="mt-1.5 text-gray-600 md:text-lg">
                    Estos son todos los juegos a los que puedes acceder.
                </p>
            </div>

            <div class="grid gap-6 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16">
                <CardGame
                    v-for="game in games"
                    :link="game.link"
                    :name="game.name"
                    :description="game.description" />
            </div>
        </div>
    </div>
</template>
