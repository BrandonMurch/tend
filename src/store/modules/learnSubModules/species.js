import learnInfo from '../../../assets/json/learn.json';

const state = () => {
    return {
        speciesList: learnInfo.species,
    }
}

const getters = {
    all: (state) => {
        return state.speciesList;
    },
    one: (state) => (name) => {
        return state.speciesList.find(species => species.name.toLowerCase() == name.toLowerCase());
    }
}



export default {
    namespaced: true,
    state,
    getters,
}