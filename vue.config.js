//vue.config.js
module.exports = {

    publicPath: process.env.NODE_ENV === 'production'
        ? '/tend/'
        : '/',

    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "tend";
                return args;
            })
    }
}

// https://stackoverflow.com/questions/62023604/where-to-find-or-how-to-set-htmlwebpackplugin-options-title-in-project-created-w