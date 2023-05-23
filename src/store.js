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
};

const actions = {
    // async storeFolder({ commit, state }, { folderHandle, fileHandle, crate }) {
    //     commit("setFolder", { folderHandle, fileHandle });
    //     commit("setCrate", crate);
    // },
    // async storeProfile({ commit, state }, profile) {
    //     commit("setProfile", profile);
    // },
};

export const store = new createStore({
    state: resetState(),
    mutations,
    actions,
    modules: {},
});

function resetState() {
    return {
        current: {
            folderHandle: undefined,
            fileHandle: undefined,
            crate: undefined,
            profile: undefined,
        },
    };
}
