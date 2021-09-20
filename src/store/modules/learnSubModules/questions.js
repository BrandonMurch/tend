import learnInfo from '../../../assets/json/learn.json';

const state = () => {
    return {
        questions: learnInfo.questions,
    }
}

const getters = {
    all: (state) => {
        return state.questions;
    },
    one: (state) => (id) => {
        return state.questions.find(question => question.id == id);
    },
    answered: (state) => {
        return state.questions.filter(question => question.answered);
    },
    unanswered: (state) => {
        return state.questions.filter(question => !question.answered);
    }
}

const mutations = {
    add(state, { text, category }) {
        // Add future verification.
        const new_question = {
            id: state.questions[state.questions.length - 1].id + 1,
            text,
            user: "User123", // Add connection to user store later.
            datetime: new Date().toISOString(),
            answered: false,
            categories: [category],
            responses: []
        }
        state.questions.push(new_question);
    },
    addResponse(state, { text, questionId }) {
        // Add future verification.
        const currentQuestion = state.questions.find(question => question.id == questionId)

        let currentId = currentQuestion.responses.length > 0
            ? currentQuestion.responses[currentQuestion.responses.length - 1].id + 1
            : 1001


        state.questions.find(question => question.id == questionId).responses.push({
            id: currentId + 1,
            text,
            user: "User123", // Add connection to user store later.
            datetime: new Date().toISOString(),
        })
    },

    delete(state, questionId) {
        state.questions = state.questions.filter(question => {
            return question.id != questionId
        });
    }
}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}