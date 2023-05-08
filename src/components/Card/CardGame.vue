<script setup lang="ts">
const props = defineProps(['link', 'name', 'description']);
</script>

<template>
    <NuxtLink
        :to="`/games/${props.link}`"
        :class="`shadow-md box-game group relative w-full h-[12rem] bg-center bg-cover rounded-xl hover:shadow-xl transition bg-img-${props.name.toLowerCase()}`">
        <div
            class="flex flex-col h-full text-gray-200 backdrop-blur-sm rounded-xl bg-black/50">
            <div class="flex-auto p-4 md:p-6 group-hover:text-white">
                <h3 class="mb-2 text-xl font-bold lg:text-2xl">
                    {{ props.name }}
                </h3>
                <p class="text-lg lg:text-xl">
                    {{ props.description }}
                </p>
            </div>
            <div class="p-4 pt-0 -mt-4 md:p-6">
                <div
                    class="inline-flex items-center gap-2 text-sm font-medium group-hover:text-white">
                    <span class="group-hover:underline">
                        Jugar al {{ props.name }}
                    </span>
                    &#10132;
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<style>
.box-game:hover {
    @apply scale-105;
}

.box-game:focus > div {
    @apply bg-yellow-500 text-black;
}

.bg-img-2048 {
    background-image: url('https://articles-images.sftcdn.net/wp-content/uploads/sites/5/2014/03/2048-Header-2.png');
}

.bg-img-uno {
    background-image: url('https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg');
}

.bg-img-solitario {
    background-image: url('https://www.free-freecell-solitaire.com/solitaire/images/solitaire_preview/large/eight_off@2x.jpg');
}

.bg-img-hextris {
    background-image: url('https://hextris.github.io/hextris/images/facebook-opengraph.png');
}
</style>
