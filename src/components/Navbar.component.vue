<template>
    <div class="flex flex-row bg-indigo-200 p-2 space-x-4">
        <div class="text-lg mr-2 flex flex-row space-x-2">
            <img alt="Describo" class="min-h-full" src="/ro-crate-logo.svg" width="36" />
            <div class="pt-1 text-xl">
                <a href="https://describo.github.io" target="_blank" class="text-indigo-800"
                    >describo</a
                >
            </div>
        </div>
        <div class="flex-grow"></div>
        <div v-if="$route.path === '/describe'" class="flex flex-row space-x-10">
            <div class="flex flex-row space-x-2">
                <div class="pt-1"><i class="fa-solid fa-folder"></i> {{ folder }}</div>
                <el-button @click="goToDashboard" type="danger">
                    <i class="fa-solid fa-trash-can"></i>
                </el-button>
            </div>
            <div v-if="!profile">
                <el-button
                    @click="data.profileDialogVisible = !data.profileDialogVisible"
                    type="primary"
                >
                    Apply a profile
                </el-button>
            </div>
            <div v-else class="flex flex-row space-x-2">
                <div class="pt-1">
                    <i class="fa-solid fa-sliders"></i> {{ profile.metadata.name }} :
                    {{ profile.metadata.version }}
                </div>
                <div>
                    <el-button @click="unloadProfile" type="danger">
                        <i class="fa-solid fa-trash-can"></i>
                    </el-button>
                    <el-button
                        @click="data.profileDialogVisible = !data.profileDialogVisible"
                        type="primary"
                    >
                        Change profile
                    </el-button>
                </div>
            </div>
            <div class="flex flex-row">
                <el-button
                    @click="saveCrate"
                    :type="data.saveButtonType"
                    :disabled="data.saveButtonType !== 'primary'"
                >
                    <i class="fa-solid fa-save"></i>&nbsp;{{ data.saveButtonText }}
                </el-button>
            </div>
        </div>
    </div>

    <ProfileDialogComponent
        :dialog-visible="data.profileDialogVisible"
        @close="data.profileDialogVisible = false"
        @load-profile="loadProfile"
    />
</template>

<script setup>
import ProfileDialogComponent from "./ProfileDialog.component.vue";
import { reactive, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const data = reactive({
    profileDialogVisible: false,
    saveButtonType: "primary",
    saveButtonText: "save",
});
onBeforeMount(async () => {
    if (!$store.state.current.crate) {
        $router.push("/dashboard");
    }
});

let profile = computed(() => $store.state.current?.profile);
let folder = computed(() => $store.state.current.fileHandle?.name);

function goToDashboard() {
    $store.commit("setCrate", undefined);
    $router.push({ path: "/dashboard" });
}

function loadProfile(profile) {
    $store.commit("setProfile", profile);
}
function unloadProfile() {
    $store.commit("setProfile", undefined);
}
async function saveCrate() {
    try {
        let fileHandle = $store.state.current.fileHandle;
        let crate = $store.state.current.crate;
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(crate, null, 2));
        await writable.close();
        data.saveButtonType = "success";
        data.saveButtonText = "saved";
    } catch (error) {
        ElMessage({
            type: "error",
            message: `There's a problem trying to save that file!`,
            duration: 5000,
            center: true,
        });
        data.saveButtonText = "not saved";
        data.saveButtonType = "danger";
    }
    setTimeout(() => {
        data.saveButtonType = "primary";
        data.saveButtonText = "save";
    }, 3000);
}
</script>
