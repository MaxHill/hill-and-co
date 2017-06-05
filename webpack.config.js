// webpack.config.js
var webpack = require('webpack');

var env = new webpack.DefinePlugin({
    ENV_DEVELOPMENT: JSON.stringify(JSON.parse(process.env.BUILD_DEVELOPMENT || false)),
    ENV_PRODUCTION: JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || false))
});

module.exports = {
    entry: {
        site: './source/javascripts/site.js'
    },

    output: {
        path: __dirname + '/.tmp/dist',
        filename: 'javascripts/[name].js',
    },

    module: {
        rules: [{
            test: /source\/javascripts\/.*\.js$/,
            exclude: /node_modules|\.tmp|vendor/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'stage-0']
            }
        }]
    },

    plugins: [
        env
    ],

    devtool: 'source-map'
};
