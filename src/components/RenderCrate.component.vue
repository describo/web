<template>
    <div>
        <div class="text-lg mr-2 flex flex-row space-x-2 bg-indigo-200 p-2">
            <img alt="Describo" class="min-h-full" src="/ro-crate-logo.svg" width="36" />
            <div class="pt-1 text-xl">
                <a href="https://describo.github.io" target="_blank" class="text-indigo-800"
                    >describo</a
                >
            </div>
        </div>
        <describo-crate-builder v-if="crate" :crate="crate" :profile="profile" :readonly="true" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const $store = useStore();

let profile = computed(() => {
    let profile = $store.state.current.profile;
    return profile;
});
let crate = computed(() => {
    let crate = $store.state.current.crate;
    return crate;
});
</script>
