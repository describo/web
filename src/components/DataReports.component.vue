<template>
    <div>
        <el-drawer
            v-model="dialogVisible"
            title="Warnings and errors"
            size="50%"
            :show-close="false"
            destroy-on-close
            direction="rtl"
            @closed="closeDialog"
        >
            <template #header>
                <div class="text-xl">Warnings and Errors</div>
                <el-button @click="closeDialog"> <i class="fa-solid fa-xmark"></i></el-button>
            </template>

            <el-tabs v-model="data.activeTab">
                <el-tab-pane label="Warnings" name="warnings">
                    <div v-if="data.activeTab === 'warnings'">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="warnings.length"
                            @current-change="nextPage"
                        />
                        <div class="flex flex-col space-y-4 mt-10">
                            <div
                                class="bg-orange-100 p-2 rounded"
                                v-for="(message, idx) of warnings.slice(
                                    (data.page - 1) * 10,
                                    data.page * 10
                                )"
                                :key="idx"
                            >
                                {{ message }}
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Errors" name="errors">
                    <div v-if="data.activeTab === 'errors'">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="errors.length"
                            @current-change="nextPage"
                        />
                        <div class="flex flex-col space-y-4 mt-10">
                            <div
                                class="bg-red-100 p-2 rounded"
                                v-for="(message, idx) of errors.slice(
                                    (data.page - 1) * 10,
                                    data.page * 10
                                )"
                                :key="idx"
                            >
                                {{ message }}
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
</template>

<script setup>
import { reactive, watch, computed } from "vue";
import { ElDrawer, ElButton, ElTabs, ElTabPane, ElPagination } from "element-plus";
import { useStore } from "vuex";
const $store = useStore();

const $emit = defineEmits(["close"]);
const props = defineProps({
    dialogVisible: { type: Boolean },
});

const data = reactive({
    activeTab: "warnings",
    page: 1,
});

let errors = computed(() => $store.state.current.errors);
let warnings = computed(() => $store.state.current.warnings);

let dialogVisible;
watch(
    () => props.dialogVisible,
    () => {
        dialogVisible = props.dialogVisible;
    }
);
function closeDialog() {
    $emit("close");
}

function nextPage(page) {
    data.page = page;
}
</script>
