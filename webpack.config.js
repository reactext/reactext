'use strict';

const path = require('path');
let webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {    
        entry: './frontend/index.js',},
    output: {
        path: path.resolve(__dirname + '/chrome-ext/build'),
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
};
