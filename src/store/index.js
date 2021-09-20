import { createStore } from 'vuex'
import user from './modules/user';
import plants from './modules/plants';
import messages from './modules/messages';


export default createStore({
    modules: {
        user,
        plants,
        messages
    }
})