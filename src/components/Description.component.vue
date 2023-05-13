<template>
    <div class="flex flex-col">
        <describo-crate-builder
            v-if="!data.error && data.crate"
            :crate="crate"
            :profile="profile"
            @ready="data.loading = false"
            @save:crate="storeCrate"
        />
        <div v-if="data.error">There seems to be an issue with this application!</div>
        >
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const $store = useStore();

const data = reactive({
    loading: false,
    error: false,
    crate: undefined,
    profile: undefined,
    folder: undefined,
    url: undefined,
});

onMounted(async () => {
    data.crate = $store.state.current.crate;
});

let profile = computed(() => $store.state.current.profile);
let crate = computed(() => $store.state.current.crate);

async function storeCrate({ crate }) {
    $store.commit("setCrate", crate);
}
</script>
