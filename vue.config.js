// @ts-nocheck
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    publicPath: '',
    outputDir: 'dist',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "圣遗物强化助手";
                return args;
            })
    },
    configureWebpack: {
        plugins: [
            Components({
                resolvers: [ElementPlusResolver()],
            })
        ]
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        }
    }
}