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

const mutations = {
    update(state, speciesToUpdate) {
        const index = state.speciesList.findIndex(species => species.name.toLowerCase() == speciesToUpdate.name.toLowerCase());
        state.speciesList[index] = speciesToUpdate;
    },
}


const actions = {
    addComment({ state, commit, rootState }, { name, text }) {
        const species = state.speciesList.find(currentSpecies =>
            currentSpecies.name.toLowerCase() == name.toLowerCase()
        );
        const new_comment = {
            id: (species.comments.length > 0 ? species.comments[0].id : 1001) + 1,
            body: text,
            datetime: new Date().toISOString(),
            user: rootState.user.name,
        }
        species.comments.unshift(new_comment)

        commit('update', species);

    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}