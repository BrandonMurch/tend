module.exports = {

    // ENABLE THIS FOR PRODUCTION.
    // mode: 'production',

    // https://stackoverflow.com/questions/62023604/where-to-find-or-how-to-set-htmlwebpackplugin-options-title-in-project-created-w
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "tend";
                return args;
            })
    }
}

