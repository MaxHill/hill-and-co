// webpack.config.js
var webpack = require('webpack');
var path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var env = new webpack.DefinePlugin({
    ENV_DEVELOPMENT: JSON.stringify(JSON.parse(process.env.BUILD_DEVELOPMENT || false)),
    ENV_PRODUCTION: JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || false))
});

module.exports = {
    entry: {
        site: ['./source/javascripts/site.js']
    },

    output: {
        path: __dirname + '/.tmp/dist',
        filename: 'javascripts/[name].js',
    },

    module: {
        loaders: [
            { 
                test: /\.js$/,
                include: path.join(__dirname, 'source/javascript'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
        ],
    },

    plugins: [
        env
    ],

    devtool: 'source-map'
};
