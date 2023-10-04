import { createStore } from "vuex";
import cloneDeep from "lodash-es/cloneDeep";

const mutations = {
    reset: (state) => {
        state = cloneDeep(resetState());
    },
    setProfile(state, profile) {
        if (!profile) {
            state.current.profile = undefined;
        } else {
            state.current.profile = { ...profile };
        }
    },
    setFolder(state, { folderHandle, fileHandle }) {
        state.current.folderHandle = folderHandle;
        state.current.fileHandle = fileHandle;
    },
    setCrate(state, crate) {
        if (!crate) {
            state.current.crate = undefined;
        } else {
            state.current.crate = { ...crate };
        }
    },
    setConfiguration(state, configuration) {
        state.current.configuration = { ...configuration };
    },
    setErrors(state, errors) {
        state.current.errors = [...errors];
    },
    setWarnings(state, warnings) {
        state.current.warnings = [...warnings];
    },
};

const actions = {};

export const store = new createStore({
    state: resetState(),
    mutations,
    actions,
    modules: {},
});

function resetState() {
    return {
        languages: [
            { name: "English", code: "en" },
            { name: "Magyar", code: "hu" },
        ],
        current: {
            configuration: {},
            folderHandle: undefined,
            fileHandle: undefined,
            crate: undefined,
            profile: undefined,
            errors: [],
            warnins: [],
        },
    };
}
