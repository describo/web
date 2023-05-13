<template>
    <el-dialog
        v-model="props.dialogVisible"
        title="Apply a profile"
        fullscreen
        destroy-on-close
        @close="closeDialog"
    >
        <template #header>Select a profile to use with this crate</template>
        <div class="flex flex-col space-y-6" v-if="props.dialogVisible">
            <div class="flex flex-row space-x-4 bg-indigo-200 p-4 rounded">
                <div class="text-lg">Load a profile from your computer</div>
                <div><el-button @click="loadProfileFromDisk" type="primary">Select</el-button></div>
            </div>
            <div class="flex-col bg-indigo-200 p-4 rounded">
                <div class="text-lg">
                    Load a profile from the
                    <a
                        href="https://github.com/describo/profiles"
                        target="_blank"
                        class="text-blue-600 underline"
                        >Describo Profiles Repository
                    </a>
                </div>
                <GithubProfileExplorerComponent @load-profile="loadProfile" />
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { reactive } from "vue";
import GithubProfileExplorerComponent from "./GithubProfileExplorer.component.vue";
import { loadProfileFromDisk as loadProfileFromDiskHandler } from "./lib";
import { useStore } from "vuex";
const $store = useStore();

const $emit = defineEmits(["close", "load-profile"]);
const props = defineProps({
    dialogVisible: { type: Boolean },
});
const data = reactive({
    loading: false,
});

function closeDialog() {
    $emit("close");
}
async function loadProfileFromDisk() {
    try {
        let { profile } = await loadProfileFromDiskHandler();
        $store.commit("setProfile", profile);
        closeDialog();
    } catch (error) {
        console.log(error);
        // ignore it - the user liekly cancelled the operation
    }
}
function loadProfile(profile) {
    $emit("load-profile", profile);
    closeDialog();
}
</script>
