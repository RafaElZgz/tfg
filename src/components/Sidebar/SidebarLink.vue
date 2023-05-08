<script setup lang="ts">
const props = defineProps(['name', 'icon', 'href']);
</script>

<template>
    <li class="relative w-full">
        <NuxtLink class="sidebar-link" :to="props.href">
            <ClientOnly>
                <Icon class="w-auto h-[1.4rem]" :name="props.icon" />
            </ClientOnly>
            <span class="ml-4">{{ props.name }}</span>
        </NuxtLink>
    </li>
</template>

<style>
.sidebar-link {
    @apply inline-flex items-center w-full px-6 py-3 text-base text-gray-800 transition-colors duration-150 hover:bg-primary/40 hover:font-semibold;
}

.sidebar-link:focus {
    @apply bg-yellow-500 text-black;
}

.sidebar-link.router-link-exact-active {
    @apply border-l-4 border-primary px-8;
}

.sidebar-link.router-link-exact-active:focus {
    @apply border-l-4 border-yellow-800;
}
</style>
