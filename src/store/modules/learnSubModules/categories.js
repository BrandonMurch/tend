import learnInfo from '../../../assets/json/learn.json';

const state = () => {
    return {
        categories: learnInfo.categories,
    }
}

const getters = {
    all: (state) => {
        return state.categories;
    },
    one: (state) => (id) => {
        return state.categories.includes(category => category == id);
    }
}

const mutations = {
    add(state, category) {
        // Add future verification.
        state.categories.push(category);
    },

    delete(state, categoryId) {
        state.categories = state.categories.filter(category => {
            return category.id != categoryId
        });
    }
}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}