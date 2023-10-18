<template>
    <div class="flex flex-col">
        <describo-crate-builder
            :crate="crate"
            :profile="profile"
            :entityId="data.entityId"
            :language="configuration.selectedLanguage"
            :purgeUnlinkedEntities="configuration.purgeUnlinkedEntities"
            :enableInternalRouting="false"
            :tab-location="configuration.tabLocation"
            @save:crate="storeCrate"
            @navigation="handleNavigation"
            @error="handleErrors"
            @warning="handleWarnings"
        />
        <div v-if="data.error">There seems to be an issue with this application!</div>
    </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import isEmpty from "lodash-es/isEmpty";
const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const crate = computed(() => {
    if (!$store.state.current.crate) $router.push("/dashboard");
    return $store.state.current.crate;
});
let profile = computed(() => $store.state.current.profile);
let watcher = [];

const data = reactive({
    error: false,
    entityId: undefined,
});

let configuration = computed(() => $store.state.current.configuration);
onMounted(async () => {
    watcher = watch(
        () => $route.query?.id,
        (n, o) => {
            if (n !== o && n !== undefined) data.entityId = decodeURIComponent(atob(n));
        }
    );
});
onBeforeUnmount(() => {
    watcher();
});

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

function handleErrors({ errors }) {
    $store.commit("setErrors", errors);
}
function handleWarnings({ warnings }) {
    $store.commit("setWarnings", warnings);
}
</script>
