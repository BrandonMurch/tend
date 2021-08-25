const state = () => {
    return {
        isLoggedIn: false,
        user: {
            name: "",
        }
    }
}


const getters = {
    username: (state) => {
        console.log(state)
        if (state.isLoggedIn) {
            return state.user.name;
        }
        throw new Error("There is no user logged in.")
    },
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    }
}

const mutations = {
    logUserIn(state, name) {
        state.isLoggedIn = true;
        state.user.name = name;
    },

    logOut(state) {
        state.isLoggedIn = false;
        state.user.name = null;
    }
}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}