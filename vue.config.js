const path = require('path')

module.exports = {
    chainWebpack: config => {
        const context = config.store.get('context')
        const resolve = _path => path.resolve(context, _path)
        config.resolve.alias
            .set('@docs', resolve('docs'))
    },
}
