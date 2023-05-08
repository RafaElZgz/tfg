<script setup lang="ts">
function closeSidebar() {
    const overlay = document.querySelector(
        '[data-hs-overlay-backdrop-template]'
    );
    if (overlay) overlay.remove();
}
</script>

<template>
    <div class="flex h-screen bg-gray-50">
        <ClientOnly>
            <Toaster closeButton richColors position="top-center" />
        </ClientOnly>
        <Sidebar @vnodeUnmounted="closeSidebar" />
        <div class="flex flex-col flex-1 w-full">
            <Header />

            <main class="h-full overflow-y-auto">
                <NuxtPage />
            </main>
        </div>
    </div>
</template>
