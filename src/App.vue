<template>
    <div>
        <div v-if="data.supported">
            <router-view />
        </div>
        <div v-else class="flex flex-col space-y-10 text-lg items-center bg-blue-200 p-4">
            <div>
                Oh dear - this browser doesn't have the capability required for this to work! Try
                using:
            </div>
            <div class="flex flex-row space-x-10">
                <div class="flex flex-col items-center">
                    <div><i class="fa-brands fa-chrome"></i></div>
                    <div>Google Chrome</div>
                </div>
                <div class="flex flex-col items-center">
                    <div><i class="fa-brands fa-edge"></i></div>
                    <div>Microsoft Edge</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const data = reactive({
    supported: false,
});

onMounted(async () => {
    data.supported = "showOpenFilePicker" in window ? true : false;
});
</script>
