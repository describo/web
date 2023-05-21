<template>
    <div class="flex flex-col space-y-2">
        <el-card>
            Describo is a tool to create
            <a
                href="https://www.researchobject.org/ro-crate/specification.html"
                target="_blank"
                class="text-blue-600 hover:text-orange-600"
            >
                Research Object Crates.
            </a>
            To find out more about Describo see the main website @
            <a
                href="https://describo.github.io"
                target="_blank"
                class="text-blue-600 hover:text-orange-600"
            >
                https://describo.github.io.
            </a>
        </el-card>
        <el-card>
            <template #header> Select an RO Crate file to work on </template>
            <div class="p-4 my-2">
                Get started by selecting a file containing an RO Crate. It can be on your local disk
                or cloud storage that is connected to your computer; e.g. Dropbox or Google Drive.
            </div>
            <el-button @click="loadFile" type="primary"
                >Select an RO Crate File to work on</el-button
            >
        </el-card>

        <el-card>
            <template #header> Select a folder of data to describe </template>
            <div class="p-4 my-2">
                Get started by selecting a folder to describe. If it contains an RO Crate file, that
                file will be loaded. If not, a default RO Crate file will be created for you. It can
                be on your local disk or cloud storage that is connected to your computer; e.g.
                Dropbox or Google Drive.
            </div>
            <el-button @click="loadFolder" type="primary">Select a folder to work on</el-button>
        </el-card>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { loadFile as loadFileHandler, loadFolder as loadFolderHandler } from "./lib";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import has from "lodash-es/has";
const $store = useStore();
const $router = useRouter();

async function loadFile() {
    try {
        let { fileHandle, crate } = await loadFileHandler();
        if (!has(crate, "@context") || !has(crate, "@graph")) {
            console.log("not a crate file");
            throw new Error(`Not an RO Crate file`);
        }
        await $store.dispatch("storeFolder", { fileHandle, crate });
        $router.push("/describe");
    } catch (error) {
        ElMessage({
            type: "error",
            message: `That doesn't look like an RO Crate file`,
            duration: 5000,
            center: true,
        });
    }
}

async function loadFolder() {
    try {
        let { folderHandle, fileHandle, crate } = await loadFolderHandler();
        await $store.dispatch("storeFolder", { folderHandle, fileHandle, crate });
        $router.push("/describe");
    } catch (error) {
        // ignore it - the user likely cancelled the operation
    }
}
</script>
