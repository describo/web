<template>
    <div>
        <div v-if="!data.unsupported">
            <router-view />
        </div>
        <div v-else class="text-center bg-blue-200 p-4">
            Oh dear - this browser doesn't have the capability required for this to work! Please use
            Google Chrome. Hopefully the other browsers will have support soon.
        </div>
    </div>
</template>

<script setup>
// import { ElMessage } from "element-plus";
import { reactive, onMounted } from "vue";
// import { useRoute, useRouter } from "vue-router";
// const $route = useRoute();
// const $router = useRouter();
import { detect } from "detect-browser";
const browser = detect();

const data = reactive({
    unsupported: false,
});

onMounted(async () => {
    // const params = new URLSearchParams(window.location.search);

    // let crate = params.get("crate");
    // let profile = params.get("profile");
    // if (crate) {
    //     crate = await retrieveCrate(crate);
    //     if (crate && profile) {
    //         profile = await retrieveProfile($route.query.profile);
    //         if (!profile) profile = {};
    //         console.log(crate, profile);

    //         $store.commit("setCrate", crate);
    //         $store.commit("setProfile", profile);
    //         $router.push({ path: "/view" });
    //     }
    // } else {
    //     data.unsupported = browser.name !== "chrome" || parseInt(browser.version) < 86;
    // }
    data.unsupported = browser.name !== "chrome" || parseInt(browser.version) < 86;
});

// async function retrieveCrate(crate) {
//     try {
//         let response = await fetch(crate);
//         if (response.status === 200) {
//             crate = await response.json();
//             return crate;
//             window.location.href = window.location.href.replace(/\?.*/, "");
//         } else {
//             throw new Error();
//         }
//     } catch (error) {
//         ElMessage({
//             message: "Unable to retrieve the crate file",
//             type: "error",
//         });
//         window.location.href = window.location.href.replace(/\?.*/, "");
//         return undefined;
//     }
// }

// async function retrieveProfile(profile) {
//     let response = await fetch(profile);
//     if (response.status === 200) {
//         profile = await response.json();
//         return profile;
//     } else {
//         ElMessage({
//             message: "Unable to retrieve the profile",
//             type: "error",
//         });
//         return undefined;
//     }
// }
</script>
