//  Store all plant data. 

import plantData from '../../assets/json/plants.json';

const state = () => {
    return {
        plants: plantData
    }
}


const getters = {
    all: (state) => {
        return state.plants;
    },
    one: (state) => (id) => {
        return state.plants.find(plant => plant.id == id);
    },
    latest: (state) => {
        return state.plants[state.plants.length - 1];
    },
    allSpecies: (state) => {
        const speciesList = []
        state.plants.forEach(plant => {
            if (plant.settings.species.length > 0) {
                speciesList.push(plant.settings.species);

            }
        });
        return speciesList.sort();

    },
    species: (state) => (species) => {
        return state.plants.find(plant => plant.settings.species == species);
    },
    comments: (state) => (id) => {
        return state.plants.find(plant => plant.id == id).comments
    },
    notes: (state) => (id) => {
        return state.plants.find(plant => plant.id == id).notes
    },
}

const mutations = {
    add(state, name) {
        // Add future verification.
        const newPlant = {
            imageSource: "https://images.unsplash.com/photo-1609843025783-6a66a8f45e0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            title: "",
            subtitle: name,
            text: "",
            id: state.plants[state.plants.length - 1].id + 1,
            settings: {
                notes: [],
                species: "",
                'indoor-outdoor': "Indoors",
                locationEnabled: false,
            },
            actions: [],
            comments: []
        };
        state.plants.push(newPlant);
    },

    update(state, plantToUpdate) {
        const index = state.plants.findIndex(plant => plant.id === plantToUpdate.id);
        state.plants[index] = plantToUpdate;
    },

    delete(state, plantId) {
        state.plants = state.plants.filter(plant => plant.id !== plantId);
    },





}


const actions = {
    addComment({ state, commit, rootState }, { id, comment }) {
        const plant = state.plants.find(plant => plant.id === id);
        const new_comment = {
            id: (plant.comments.length > 0 ? plant.comments[0].id : 1001) + 1,
            body: comment,
            datetime: new Date().toISOString(),
            user: rootState.user.name,
        }
        plant.comments.unshift(new_comment)

        commit('update', plant);

    }
}




export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}