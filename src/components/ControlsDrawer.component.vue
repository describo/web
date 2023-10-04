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
            <el-form :model="data.form" label-position="top" class="flex flex-col space-y-4 w-full">
                <el-form-item label="Language">
                    <el-select
                        class="w-full"
                        v-model="data.form.selectedLanguage"
                        placeholder="Select a language"
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
                <el-form-item label="Tab location when describing data">
                    <el-radio-group v-model="data.form.tabLocation">
                        <el-radio label="left">Left</el-radio>
                        <el-radio label="top">Top</el-radio>
                        <el-radio label="right">Right</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-switch
                        v-model="data.form.autoSave"
                        active-text="Save changes automatically"
                    />
                </el-form-item>
                <el-form-item>
                    <el-switch
                        v-model="data.form.purgeUnlinkedEntities"
                        active-text="Automatically remove unlinked entities and disconnected subtrees."
                    />
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import {
    ElDrawer,
    ElButton,
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElSwitch,
    ElRadioGroup,
    ElRadio,
} from "element-plus";
import { useStore } from "vuex";
const $store = useStore();

const $emit = defineEmits(["close"]);
const props = defineProps({
    dialogVisible: { type: Boolean },
});

const defaultConfiguration = {
    selectedLanguage: "en",
    autoSave: true,
    purgeUnlinkedEntities: true,
    tabLocation: "right",
};

const data = reactive({
    form: window.localStorage?.form
        ? { ...defaultConfiguration, ...JSON.parse(window.localStorage.form) }
        : defaultConfiguration,
    languages: $store.state.languages,
});
$store.commit("setConfiguration", { ...data.form });

let dialogVisible;
watch(
    () => props.dialogVisible,
    () => {
        dialogVisible = props.dialogVisible;
    }
);
watch(
    () => data.form,
    () => {
        window.localStorage.form = JSON.stringify(data.form);
        $store.commit("setConfiguration", { ...data.form });
    },
    { deep: true }
);

function closeDialog() {
    $emit("close");
}
</script>
