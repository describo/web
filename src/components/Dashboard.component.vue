<template>
    <div class="flex flex-col space-y-2">
        <el-card>
            <template #header> Select an RO Crate file to work on </template>
            <div class="p-4 my-2">
                Get started by selecting an RO Crate file to work on (it can have any name). It can
                be on your local disk or cloud storage that is connected to your computer; e.g.
                Dropbox or Google Drive.
            </div>
            <el-button @click="loadCrate" type="primary"
                >Select an RO Crate File to work on</el-button
            >
        </el-card>

        <!-- <el-card>
            <template #header> Select a folder of data to describe </template>
            <div class="p-4 my-2">
                Get started by selecting a folder to describe. If it contains an RO Crate file, that
                file will be loaded. It can be on your local disk or cloud storage that is connected
                to your computer; e.g. Dropbox or Google Drive.
            </div>
            <el-button @click="loadCrate" type="primary">Select a folder to work on</el-button>
        </el-card> -->
    </div>
</template>

<script setup>
import { loadCrate as loadCrateHandler, loadFolder as LoadFolderHandler } from "./lib";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const $store = useStore();
const $router = useRouter();

async function loadCrate() {
    try {
        let { folderHandle, fileHandle, crate } = await loadCrateHandler();
        await $store.dispatch("storeFolder", { folderHandle, fileHandle, crate });
        $router.push("/describe");
    } catch (error) {
        // ignore it - the user likely cancelled the operation
    }
}
</script>
