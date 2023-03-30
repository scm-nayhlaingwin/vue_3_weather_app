<template>
    <Suspense>
        <async-city-view />
        <template #fallback>
           
            <img 
                src="../assets/images/Loading_gift.gif" alt="Loading...."
                class="w-[50px] h-auto mx-auto mt-28"
            >
        </template>
    </Suspense>
</template>

<script setup>
    import AsyncCityView from './AsyncCityView.vue';
</script>

<style lang="scss" scoped>

</style>