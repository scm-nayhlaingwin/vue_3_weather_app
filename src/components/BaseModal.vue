<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div
                v-show="modalActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
            >
                <Transition name="modal-inner">
                    <div class="p-4 bg-white self-start mt-32 max-w-screen-md">
                        <slot />
                        <button 
                            class="text-white mt-8 bg-weather-primary py-2 px-6"
                            @click="$emit('close-event')"
                        >
                            Close
                        </button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
    defineProps({
        modalActive: {
            type: Boolean,
            default: false
        }
    })
    defineEmits(['close-event'])
</script>

<style scoped>
    .modal-outer-enter-active,
    .modal-outer-leave-active {
        transition: opacity 03s cubic-bezier(0.52, 0.02. 0.19, 1.02);
    }
    
    .modal-outer-enter-from,
    .modal-outer-leave-to {
        opacity: 0;
    }
    
    .modal-inner-enter-active {
        transition: all 03s cubic-bezier(0.52, 0.02. 0.19, 1.02) 0.15s;
    }
    .modal-inner-leave-active {
        transition: all 03s cubic-bezier(0.52, 0.02. 0.19, 1.02);
    }
    .modal-innder-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }
    .modal-innder-enter-to {
        transform: scale(0.8);
    }
</style>