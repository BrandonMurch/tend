//  Entry point into application.

import { createStore } from 'vuex'
import user from './modules/user';
import plants from './modules/plants';
import messages from './modules/messages';
import learn from './modules/learn';


export default createStore({
    modules: {
        user,
        plants,
        messages,
        learn,
    }
})