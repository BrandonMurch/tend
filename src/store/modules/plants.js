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
    }
}

const mutations = {
    add(state, plant) {
        // Add future verification.
        state.plants.push(plant);
    },

    update(state, plantToUpdate) {
        const index = state.plants.findIndex(plant => plant.id === plantToUpdate.id);
        state.plants[index] = plantToUpdate;
    },

    delete(state, plantId) {
        state.plants = state.plants.filter(plant => plant.id !== plantId);
    }



}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}