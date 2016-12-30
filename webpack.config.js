const path = require('path');

let config = {
    entry  : './src/anim.js',
    output : {
        path     : path.resolve(__dirname, 'dist'),
        filename : 'anim.js'
    },
    devTool : '#cheap-inline-source-map',
    module  : {
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

module.exports = config;
