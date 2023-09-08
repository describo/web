<template>
    <div class="flex flex-col">
        <describo-crate-builder
            v-if="!data.error && data.crate"
            :crate="data.crate"
            :profile="profile"
            :entityId="data.entityId"
            :language="language.code"
            :enableInternalRouting="false"
            tab-location="right"
            @ready="data.loading = false"
            @save:crate="storeCrate"
            @navigation="handleNavigation"
        />
        <div v-if="data.error">There seems to be an issue with this application!</div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import isEmpty from "lodash-es/isEmpty";
const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const data = reactive({
    loading: false,
    error: false,
    entityId: undefined,
    crate: undefined,
    profile: undefined,
    folder: undefined,
    url: undefined,
});

let language = computed(() => $store.state.current.language);
onMounted(async () => {
    if (!$store.state.current.crate) $router.push("/dashboard");
    data.crate = $store.state.current.crate;

    data.routeWatcher = watch(
        () => $route.query?.id,
        (n, o) => {
            if (n !== o && n !== undefined) data.entityId = decodeURIComponent(atob(n));
        }
    );
});
onBeforeUnmount(() => {
    data.routeWatcher();
});

let profile = computed(() => $store.state.current.profile);

async function storeCrate({ crate }) {
    $store.commit("setCrate", crate);
}
function handleNavigation(event) {
    const id = btoa(encodeURIComponent(event["@id"]));
    if (isEmpty($route?.query)) {
        $router?.replace({ query: { id } });
    } else {
        $router?.push({ query: { id } });
    }
    data.entityId = id;
}
</script>
