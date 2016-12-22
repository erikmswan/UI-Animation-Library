module.exports = {
    entry  : './src/anim.js',
    output : {
        filename : 'anim.js'
    },
    module : {
        loaders : [
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                loader  : 'babel-loader',
                query   : {
                    presets : ['es2015']
                }
            }
        ]
    }
};
