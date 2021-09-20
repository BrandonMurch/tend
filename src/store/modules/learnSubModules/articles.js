import learnInfo from '../../../assets/json/learn.json';

const state = () => {
    return {
        articles: learnInfo.articles,
    }
}

const getters = {
    all: (state) => {
        return state.articles;
    },
    one: (state) => (id) => {
        return state.articles.find(article => article.id == id);
    },
    byCategories: (state) => (category) => {
        if (category == "all") {
            return state.articles
        } else {
            return state.articles.filter(article => article.categories.includes(category));
        }
    },

}

const mutations = {
    add(state, article) {
        // Add future verification.
        state.articles.push(article);
    },

    delete(state, articleId) {
        state.articles = state.articles.filter(article => {
            return article.id != articleId
        });
    }
}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}