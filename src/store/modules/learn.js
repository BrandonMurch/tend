import articles from './learnSubModules/articles'
import questions from './learnSubModules/questions'
import categories from './learnSubModules/categories'
import species from './learnSubModules/species'

export default {
    namespaced: true,
    modules: {
        categories, questions, articles, species
    }
}