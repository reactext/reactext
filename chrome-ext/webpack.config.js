'use strict';

let webpack = require('webpack');

module.exports = {
    entry: {    
        mode: 'development',
        entry: './main.js',},
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            }
            ]
        },
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }
        ]
    },
    devServer: {
        publicPath: "/build/",
        hot: true,
        port: 3000
    }
};
