// Store information about the user.
const state = () => {
    return {
        isLoggedIn: true,
        name: "brandon",
    }
}


const getters = {
    name: (state) => {
        if (state.isLoggedIn) {
            return state.name;
        } else {
            throw new Error("There is no user logged in.")

        }
    },
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    }
}

const mutations = {
    logIn(state, name) {
        state.isLoggedIn = true;
        state.name = name;
    },
    logOut(state) {
        state.isLoggedIn = false;
        state.name = "";
    },


}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}