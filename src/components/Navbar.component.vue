<template>
    <div class="sticky top-0 z-50 flex flex-row items-center bg-indigo-200 p-2 space-x-4">
        <div class="text-lg mr-2 flex flex-row space-x-2">
            <a href="https://describo.github.io" target="_blank" class="text-indigo-800">
                <img :src="describoLogo" class="h-20" />
            </a>
        </div>

        <div class="flex-grow"></div>
        <div class="flex flex-col space-y-2 items-end">
            <div class="flex flex-row space-x-4" v-if="$route.path === '/describe'">
                <div class="flex flex-row space-x-2">
                    <div><i class="fa-solid fa-folder"></i> {{ folder }}</div>
                    <div>
                        <el-button @click="goToDashboard" type="danger">
                            <i class="fa-solid fa-trash-can"></i>
                        </el-button>
                    </div>
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
                    <div>
                        <i class="fa-solid fa-sliders"></i> {{ profile?.metadata?.name }} :
                        {{ profile?.metadata?.version }}
                    </div>
                    <div>
                        <el-button @click="unloadProfile" type="danger">
                            <i class="fa-solid fa-trash-can"></i>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="flex flex-row space-x-2">
                <div v-if="$route.path === '/describe'">
                    <el-button
                        @click="saveCrate"
                        :type="data.saveButtonType"
                        :disabled="data.saveButtonType !== 'primary'"
                    >
                        <i class="fa-solid fa-save"></i>&nbsp;{{ data.saveButtonText }}
                    </el-button>
                </div>
                <div>
                    <el-button @click="data.controlsDrawerVisible = !data.controlsDrawerVisible">
                        <i class="fa-solid fa-gear"></i>
                    </el-button>
                </div>
            </div>
        </div>
    </div>

    <ProfileDrawerComponent
        :dialog-visible="data.profileDialogVisible"
        @close="data.profileDialogVisible = false"
    />
    <ControlsDrawerComponent
        :dialog-visible="data.controlsDrawerVisible"
        @close="data.controlsDrawerVisible = false"
    />
</template>

<script setup>
import describoLogo from "../assets/describo-logo10-trans.png";
import ProfileDrawerComponent from "./ProfileDrawer.component.vue";
import ControlsDrawerComponent from "./ControlsDrawer.component.vue";
import { reactive, computed, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElButton } from "element-plus";
const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const data = reactive({
    controlsDrawerVisible: false,
    profileDialogVisible: false,
    saveButtonType: "primary",
    saveButtonText: "save",
});
let configuration = computed(() => $store.state.current.configuration);
watch(
    () => $store.state.current.crate,
    () => {
        if ($route.path === "/describe" && configuration.value.autoSave) {
            saveCrate();
        }
    }
);

onBeforeMount(async () => {
    if (!$store.state.current.crate) {
        $router.push("/dashboard");
    }
});

let profile = computed(() => $store.state.current?.profile);
let folder = computed(() => {
    if ($store.state.current.folderHandle?.name) {
        return `${$store.state.current?.folderHandle?.name}/ro-crate-metadata.json`;
    } else {
        return $store.state.current.fileHandle?.name;
    }
});

function goToDashboard() {
    $store.commit("setCrate", undefined);
    $router.push({ path: "/dashboard" });
}

function unloadProfile() {
    $store.commit("setProfile", undefined);
}
async function saveCrate() {
    try {
        let fileHandle = $store.state.current.fileHandle;
        let crate = $store.state.current.crate;
        if (!crate) return;
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
