// import { dialog } from "electron";
// import { readJSON, writeJSON, pathExists, remove } from "fs-extra";
// import path from "path";
import fetch from "cross-fetch";
// import { dirname } from "path";
// const Store = require("electron-store");
// export const store = new Store();
// store.set("configurationPath", dirname(store.path));

export async function loadFile() {
    // console.log("F:loadCrate");
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    let crate;
    crate = await JSON.parse(await file.text());
    return { fileHandle, crate };
}

export async function loadFolder() {
    // console.log("F:loadFolder");
    let folderHandle = await window.showDirectoryPicker();

    let hasCrateFile = false;
    for await (const entry of folderHandle.values()) {
        if (entry.name === "ro-crate-metadata.json") {
            hasCrateFile = true;
        }
    }
    if (hasCrateFile) {
        let crate;
        let fileHandle = await folderHandle.getFileHandle("ro-crate-metadata.json");

        const file = await fileHandle.getFile();
        try {
            crate = await JSON.parse(await file.text());
        } catch (error) {
            crate = getCrateSkeleton();
        }
        return { folderHandle, fileHandle, crate };
    } else {
        let crate = getCrateSkeleton();
        let fileHandle = await folderHandle.getFileHandle("ro-crate-metadata.json", {
            create: true,
        });
        return { folderHandle, fileHandle, crate };
    }
}

export async function loadProfileFromDisk() {
    // console.log("F:loadProfileFromDisk");

    // const { filePaths } = await dialog.showOpenDialog({ properties: ["openFile"] });
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    let profile = await JSON.parse(await file.text());
    return { profile };
}

export async function loadProfileFromUrl(event, data) {
    // console.log("F:loadProfileFromUrl", data.url);

    // returns the profile JSON object from the specified url
    let response = await fetch(data.url, { method: "GET" });
    if (response.status === 200) {
        let profile = await response.json();
        return { profile };
    }
    return;
}

function getCrateSkeleton() {
    return {
        "@context": [
            "https://w3id.org/ro/crate/1.1/context",
            {
                "@base": null,
            },
        ],
        "@graph": [
            {
                "@id": "ro-crate-metadata.json",
                "@type": "CreativeWork",
                conformsTo: {
                    "@id": "https://w3id.org/ro/crate/1.1",
                },
                about: {
                    "@id": "./",
                },
            },
            {
                "@id": "./",
                "@type": ["Dataset"],
                name: "My Research Object Crate",
            },
        ],
    };
}
