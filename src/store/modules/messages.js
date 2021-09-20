import messages from '../../assets/json/messages.json';

const state = () => {
    return {
        messages: messages
    }
}


const getters = {
    all: (state) => {
        return state.messages;
    },
    one: (state) => (id) => {
        return state.messages.find(message => message.id == id);
    }
}

const mutations = {
    addMessage(state, message) {
        // Add future verification.
        state.messages.push(message);
    },

    deleteMessage(state, messageToDeleteId) {
        state.messages = state.messages.filter(message => {
            return message.id != messageToDeleteId
        });

    }



}




export default {
    namespaced: true,
    state,
    getters,
    mutations
}