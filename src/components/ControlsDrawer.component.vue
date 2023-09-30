<template>
    <div>
        <el-drawer
            v-model="dialogVisible"
            title="Preferences"
            size="50%"
            :show-close="false"
            destroy-on-close
            direction="rtl"
            @closed="closeDialog"
        >
            <template #header>
                <div class="text-xl">Preferences</div>
                <el-button @click="closeDialog"> <i class="fa-solid fa-xmark"></i></el-button>
            </template>
            <div class="class flex flex-col">
                <el-form :model="data.form" label-position="top">
                    <el-form-item label="Language">
                        <el-select
                            class="w-full"
                            v-model="data.selectedLanguage"
                            placeholder="Select a language"
                            @change="setLanguage"
                        >
                            <el-option
                                v-for="item in data.languages"
                                :key="item.name"
                                :label="item.name"
                                :value="item.code"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { ElSelect, ElOption, ElDrawer } from "element-plus";
import { useStore } from "vuex";
const $store = useStore();

const $emit = defineEmits(["close"]);
const props = defineProps({
    dialogVisible: { type: Boolean },
});

let dialogVisible;
watch(
    () => props.dialogVisible,
    () => {
        dialogVisible = props.dialogVisible;
    }
);

const data = reactive({
    languages: $store.state.languages,
    selectedLanguage: "en",
});

function closeDialog() {
    $emit("close");
}
function setLanguage(languageCode) {
    $store.commit("setLanguage", languageCode);
}
</script>
