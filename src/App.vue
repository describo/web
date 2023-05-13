<template>
    <div>
        <div v-if="!data.unsupported">
            <router-view />
        </div>
        <div v-else class="text-center bg-blue-200 p-4">
            Oh dear - this browser doesn't have the capability required for this to work! Please use
            Google Chrome or a Chrome based browser (Brave Browser, Microsoft Edge).
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const $store = useStore();
const $route = useRoute();
const $router = useRouter();
import { detect } from "detect-browser";
const browser = detect();

const data = reactive({
    browser,
    unsupported: false,
});

onMounted(async () => {
    if ($route.query.crate) {
        let crate = await retrieveCrate($route.query.crate);
        let profile;
        if (crate && $route.query.profile) {
            profile = await retrieveProfile($route.query.profile);
            if (!profile) profile = {};
        }
        $store.commit("setCrate", crate);
        $store.commit("setProfile", profile);
        $router.push({ path: "/render" });
    } else {
        data.unsupported = browser.name !== "chrome" || parseInt(browser.version) < 86;
        $router.push({ path: "/dashboard" });
    }
});

async function retrieveCrate(crate) {
    let response = await fetch(crate);
    if (response.status === 200) {
        crate = await response.json();
        return crate;
    } else {
        return undefined;
    }
}

async function retrieveProfile(profile) {
    let response = await fetch(profile);
    if (response.status === 200) {
        profile = await response.json();
        return profile;
    } else {
        return undefined;
    }
}
</script>
