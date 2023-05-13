// import { dialog } from "electron";
// import { readJSON, writeJSON, pathExists, remove } from "fs-extra";
// import path from "path";
import fetch from "cross-fetch";
// import { dirname } from "path";
// const Store = require("electron-store");
// export const store = new Store();
// store.set("configurationPath", dirname(store.path));

export async function storeGet(event, key) {
    return store.get(key);
}

export async function storeSet(event, data) {
    let value;
    try {
        value = JSON.parse(data.value);
    } catch (error) {
        value = data.value;
    }
    return store.set(data.key, value);
}

export async function storeRemove() {
    await remove(store.path);
}

export async function loadCrate() {
    console.log("F:loadCrate");
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    let crate = await JSON.parse(await file.text());
    if (!crate) {
        crate = getCrateSkeleton();
    }
    return { fileHandle, crate };
}

export async function loadFolder() {
    console.log("F:loadFolder");
    const folderHandle = await window.showDirectoryPicker();

    let hasCrateFile = false;
    for await (const entry of folderHandle.values()) {
        if (entry.name === "ro-crate-metadata.json") {
            hasCrateFile = true;
        }
    }
    if (hasCrateFile) {
        const fileHandle = await folderHandle.getFileHandle("ro-crate-metadata.json");
        const file = await fileHandle.getFile();
        crate = JSON.parse(await file.text());
        return { folderHandle, fileHandle, crate };
    } else {
        crate = getCrateSkeleton();
    }
    return { folderHandle, fileHandle, crate };
}

export async function loadProfileFromDisk() {
    console.log("F:loadProfileFromDisk");

    // const { filePaths } = await dialog.showOpenDialog({ properties: ["openFile"] });
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    let profile = await JSON.parse(await file.text());
    return { profile };
}

export async function loadProfileFromUrl(event, data) {
    console.log("F:loadProfileFromUrl", data.url);

    // returns the profile JSON object from the specified url
    let response = await fetch(data.url, { method: "GET" });
    if (response.status === 200) {
        let profile = await response.json();
        return { profile };
    }
    return;
}

export async function loadProfilesFromGithub() {
    console.log("F:loadProfilesFromGithub", data.url);

    // returns the profiles in the profiles repo
}

// export async function saveCrate(event, data) {
//     console.log("F:saveCrate");

//     // saves the crate file back to the specified folder
//     let crateFile = path.join(data.folder, "ro-crate-metadata.json");
//     await writeJSON(crateFile, data.crate);
// }

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
