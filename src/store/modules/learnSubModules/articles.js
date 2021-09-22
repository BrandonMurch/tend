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
    update(state, articleToUpdate) {
        const index = state.articles.findIndex(article => article.id == articleToUpdate.id);
        state.articles[index] = articleToUpdate;
    },
}


const actions = {
    addComment({ state, commit, rootState }, { id, text }) {
        const article = state.articles.find(currentArticle => currentArticle.id == id);
        const new_comment = {
            id: (article.comments.length > 0 ? article.comments[0].id : 1001) + 1,
            body: text,
            datetime: new Date().toISOString(),
            user: rootState.user.name,
        }
        article.comments.unshift(new_comment)

        commit('update', article);

    }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}